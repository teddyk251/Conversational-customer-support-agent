import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, Radio, RadioGroup, Stack, Select } from '@chakra-ui/react';
import { IoIosCloseCircle } from "react-icons/io";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { MdOutlineSend } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL
interface SupportBotProps {
    toggle: () => void;
}
const SupportBot: React.FC<SupportBotProps> = ({ toggle }) => {
    const recorderControls = useAudioRecorder();
    const [messages, setMessages] = useState<{ type: 'user' | 'backend', content: string, isAudio: boolean }[]>([]);
    const [test_messages, setTestMessages] = useState<{ type: 'user' | 'backend', content: string, isReq: boolean }[]>([]);
    const [loading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('audio');
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [language, setLanguage] = useState<"en" | "rw" | "sw" | "fr">('en');
    const addAudioElement = async (blob: Blob) => {
        blob = new Blob([blob],
            {
                type: 'audio/wav',

            },
        );
        const url = URL.createObjectURL(blob);
        setMessages(prev => [...prev, { type: 'user', content: url, isAudio: true }]);
        setLoading(true);
        // console.log("temp_URL", url);
        try {
            const backendResponse = await sendToBackend(blob, language);
            setMessages(prev => [...prev, { type: 'backend', content: backendResponse.content, isAudio: backendResponse.isAudio }]);
        } catch (error) {
            console.error("Error sending audio to backend:", error);
            setMessages(prev => [...prev, { type: 'backend', content: "Error processing audio", isAudio: false }]);
        } finally {
            setLoading(false);
        }
    };

    const addTextElement = async (text: string) => {
        if (!text.trim()) return;

        setTestMessages(prev => [...prev, { type: 'user', content: text, isReq: false }]);
        setLoading(true);

        try {
            const backendResponse = await sendTextToBackend(text);
            setTestMessages(prev => [...prev, { type: 'backend', content: backendResponse.content, isReq: backendResponse.isReq }]);
        } catch (error) {
            console.error("Error sending text to backend:", error);
            setTestMessages(prev => [...prev, { type: 'backend', content: "Error processing message", isReq: false }]);
        } finally {
            setLoading(false);
        }
    };

    const sendTextToBackend = async (text: string): Promise<{ content: string, isReq: boolean }> => {
        // Simulating backend call
        try {
            const response = await axios.post(`${apiUrl}/process`, { "text":text },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Accept': 'application/json',
                    },
                    params: {
                        lang: language==="en"?"en":language==="rw"?"rw":language==="sw"?"sw":"fr"
                    }
                });
            const data = response.data;
            if (data.response) {
                return { content: data.response, isReq: false };
            }
            return { content: data.redirect_url, isReq: true };

        }
        catch (error) {
            console.error("Error sending text to backend:", error);
            return { content: "Error processing message", isReq: false };
        }
    };

    const sendToBackend = async (blob: Blob, lang: "en" | "rw" | "sw" | "fr"): Promise<{ content: string, isAudio: boolean }> => {
        const formData = new FormData();
        formData.append('file', blob, 'audio.wav');

        try {
            const response = await axios.post(`${apiUrl}/process`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Accept': 'application/json',
                },
                params: {
                    lang: lang
                }
            });

            if (response.data.audio) {
                console.log("Audio response", response.data.audio);
                return { content: response.data.audio, isAudio: true };
            }
            return { content: response.data.redirect_url, isAudio: false };
        }
        catch (error) {
            console.error("Error sending audio to backend:", error);
            return { content: "Error processing audio", isAudio: false };
        }



    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }

    }, [messages, test_messages]);


    const handleSendText = () => {
        const textArea = document.querySelector('textarea') as HTMLTextAreaElement;
        if (textArea && textArea.value.trim() !== '') {
            addTextElement(textArea.value);
            textArea.value = '';
        }
    };

    return (
        <div>
            <Box className="bg-slate-100 rounded-xl shadow-lg w-[500px] h-[600px] z-50">
                <div className="flex justify-between p-4 z-10 shadow-md">
                    <div className='flex items-center'>
                        <Text className="text-lg mr-3">Support</Text>
                        {(messages.length === 0 && test_messages.length === 0) && (
                            <RadioGroup onChange={setMessageType} value={messageType}>
                                <Stack direction="row">
                                    <Radio value="audio">Audio</Radio>
                                    <Radio value="text">Text</Radio>
                                </Stack>
                            </RadioGroup>
                        )}
                        <Select
                            placeholder=""
                            ml={3}
                            style={{ width: '100px' }}
                            onChange={(e) => setLanguage(e.target.value as "en" | "rw" | "sw" | "fr")}
                            value={language}
                        >
                            <option value="en">English</option>
                            <option value="fr">French</option>
                            <option value="sw">Swahili</option>
                            <option value="rw">Kinyarwanda</option>
                        </Select>
                    </div>
                    <IoIosCloseCircle className='text-3xl' onClick={() => { toggle(); }} />
                </div>
                <Box className="h-[460px] overflow-y-auto p-4 custom-scrollbar" ref={chatContainerRef}>
                    {messageType === 'audio'
                        ? messages.map((message, index) => (
                            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {message.isAudio ? (
                                    <audio src={message.content} controls className="mb-2" />
                                ) : (
                                    <Text className="mb-2 text-start">
                                        {message.content}
                                        <Link to={{
                                            pathname: "/new_permit",
                                            search: `?language=${language}`,
                                        }} className="text-blue-500 cursor-pointer ml-2">
                                            Proceed
                                        </Link>
                                    </Text>
                                )}
                            </div>
                        ))
                        : test_messages.map((message, index) => (
                            <Box
                                key={index}
                                className={`flex ${message.type === 'user' ? 'justify-end text-end ml-36' : 'justify-start text-start mr-36'}`}
                                bg={message.type === 'user' ? 'blue.100' : 'gray.100'}
                                p={3}
                                borderRadius="md"
                                mb={2}
                                maxW="300px"
                            >
                                {message.isReq ? (
                                    <Text className="mb-2 text-start">
                                        {message.content}
                                        <Link to={{
                                            pathname: "/new_permit",
                                            search: `?language=${language}`,
                                        }} className="text-blue-500 cursor-pointer ml-2">
                                            Proceed
                                        </Link>
                                    </Text>
                                ) : (
                                    <Text className="mb-2 w-[300px]">{message.content}</Text>
                                )}
                            </Box>
                        ))
                    }
                    {loading && <div className="flex justify-center">Loading...</div>}
                </Box>
                <Box className='flex justify-center'>
                    {messageType === 'audio' ? (
                        <>
                            <AudioRecorder
                                onRecordingComplete={(blob) => {
                                    addAudioElement(blob);

                                }}
                                downloadFileExtension='wav'
                                // downloadOnSavePress={true}
                                recorderControls={recorderControls}
                            />
                            {recorderControls.isRecording && (
                                <MdOutlineSend onClick={() => {
                                    recorderControls.stopRecording();

                                }} className='m-5 text-3xl cursor-pointer' />
                            )}
                        </>
                    ) : (
                        <div className='flex w-full items-center'>
                            <textarea
                                className="w-full ml-2 p-2 rounded-lg resize-none overflow-hidden"
                                rows={1}
                                style={{
                                    minHeight: '40px',
                                    height: '40px',
                                    maxHeight: '80px',
                                }}
                                placeholder='Type a message...'
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = '6px';
                                    target.style.height = `${Math.min(target.scrollHeight, 70)}px`;
                                }}
                            />
                            <MdOutlineSend className='m-5 text-3xl cursor-pointer' onClick={handleSendText} />
                        </div>
                    )}
                </Box>
            </Box>
        </div>
    );
};

export default SupportBot;