import React from 'react';
import axios from 'axios';
import { useAppSelector } from '../store/store';
import { useUpdateState } from '../store/global';

const useBreeds = ({ trigger = true } = {}) => {
  const updateState = useUpdateState();
  var breeds = useAppSelector(s => s.global.breeds);
  var loading = useAppSelector(s => s.global.loading);
  var error = useAppSelector(s => s.global.error);
  const handleRefresh = React.useCallback(async () => {
    updateState({ loading: true, breeds: [] });
    try {
      const response = (await axios.get('https://dog.ceo/api/breeds/list/all')) as any;
      if (response?.data?.status === 'success' && response?.data?.message) {
        updateState({ loading: false, breeds: response.data.message });
      } else {
        console.error('Error loading breeds', response);
        updateState({ loading: false, error: { message: 'Error loading breeds' } });
      }
    } catch (ex) {
      console.error('Error loading breeds', ex);
      updateState({ loading: false, error: ex });
    }
  }, [updateState]);

  React.useEffect(() => {
    trigger && handleRefresh(); // Auto-load if trigger set
  }, [trigger, handleRefresh]);

  return { breeds, loading, error, handleRefresh };
};

export default useBreeds;
