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
        let errorMsg = errorData.message || `Failed to send message (${response.status})`;
        
        // Include specific validation errors if available
        if (errorData.errors && Array.isArray(errorData.errors)) {
          const validationErrors = errorData.errors
            .map((err: any) => err.message || JSON.stringify(err))
            .join(', ');
          if (validationErrors) {
            errorMsg = `Validation error: ${validationErrors}`;
          }
        }
        
        throw new Error(errorMsg);
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
