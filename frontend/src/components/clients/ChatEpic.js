import React, {useState} from 'react';
import { Message } from '@mui/icons-material';
import {FAQChatbot} from './ChatBot'

export const ChatEpic = () => {
    const [open, setOpen] = useState(false);
    return !open ? (<div onClick={() => setOpen(!open)} className='fixed bottom-10 right-10 bg-blue-400 p-3 rounded-full'><Message color='primary'/></div>) : (
        <FAQChatbot setOpen={setOpen} className='fixed bottom-10 right-10' />
    );
};