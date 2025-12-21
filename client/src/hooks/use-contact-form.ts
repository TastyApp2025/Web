import { useState } from 'react';
import { siteContent } from '@/data/site-content';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

export function useContactForm() {
  const [state, setState] = useState<ContactFormState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  });

  const submitForm = async (formData: ContactFormData) => {
    setState({
      isLoading: true,
      isSuccess: false,
      isError: false,
      errorMessage: '',
    });

    try {
      const response = await fetch(siteContent.contact.contactFormEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to send message (${response.status})`);
      }

      setState({
        isLoading: false,
        isSuccess: true,
        isError: false,
        errorMessage: '',
      });

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage,
      });

      return false;
    }
  };

  const reset = () => {
    setState({
      isLoading: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
    });
  };

  return { ...state, submitForm, reset };
}
