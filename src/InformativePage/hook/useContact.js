// src/hooks/useContact.js
import { useState, useCallback } from 'react';
import { sendContactRequest } from '@/services/publicContactsService';

export function useContact() {
  const [sending, setSending] = useState(false);
  const [error, setError]     = useState(null);

  const send = useCallback(async (form) => {
    setSending(true);
    setError(null);
    try {
      await sendContactRequest(form);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setSending(false);
    }
  }, []);

  return { send, sending, error };
}
