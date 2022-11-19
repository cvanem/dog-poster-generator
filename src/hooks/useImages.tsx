import React from 'react';
import axios from 'axios';
import { useAppSelector } from '../store/store';
import { useUpdateState } from '../store/global';
import { isEmpty } from '../helpers';

export default function useImages({ trigger = false } = {}) {
  const updateState = useUpdateState();
  var images = useAppSelector(s => s.global.images);
  var loading = useAppSelector(s => s.global.loading);
  var error = useAppSelector(s => s.global.error);
  const selectedBreeds = useAppSelector(state =>
    Object.keys(state.global.selected)
      .filter(k => !isEmpty(state.global.selected[k]?.breed)) // Remove empty rows
      .reduce(
        (t, c) => ({
          ...t,
          [[state.global.selected[c].breed, state.global.selected[c].subBreed].filter(v => !isEmpty(v)).join('/')]: state.global.selected[c].count
        }),
        {}
      )
  );

  const handleRefresh = React.useCallback(async () => {
    const getImages = async ({ breed, count }) => {
      const response = (await axios.get(`https://dog.ceo/api/breed/${breed}/images/random/${count}`)) as any;
      if (response?.data?.status === 'success' && response?.data?.message) {
        return response?.data?.message;
      } else {
        const error = { message: 'Error loading images', response };
        console.error(error.message, response);
        throw error;
      }
    };

    updateState({ loading: true, images: [] });
    var images = [];
    try {
      for (var i = 0; i < Object.keys(selectedBreeds).length; i++) {
        const breed = Object.keys(selectedBreeds)[i];
        const count = selectedBreeds[breed];
        var data = await getImages({ breed, count });
        if (data && data.length > 0) {
          images = [...images, ...data];
        }
      }
      updateState({ loading: false, images });
    } catch (ex) {
      console.error('Error loading images', ex);
      updateState({ loading: false, error: ex });
    }
    // eslint-disable-next-line
  }, [JSON.stringify(selectedBreeds), updateState]);

  React.useEffect(() => {
    trigger && handleRefresh(); // Auto-load if trigger set
  }, [trigger, handleRefresh]);

  return { images, loading, error, handleRefresh };
}
