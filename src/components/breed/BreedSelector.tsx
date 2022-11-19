import useBreeds from '../../hooks/useBreeds';
import { useSelectBreed } from '../../store/global';
import AutoCompleteSelector from '../input/AutoCompleteSelector';

export default function BreedSelector({ id, value, placeholder = 'Please select breed...' }) {
  const { breeds, loading } = useBreeds({ trigger: false });
  const selectBreed = useSelectBreed();
  return (
    <AutoCompleteSelector
      value={value}
      loading={loading}
      placeholder={placeholder}
      onChange={breed => selectBreed({ id, breed, subBreed: undefined })}
      options={Object.keys(breeds)}
    />
  );
}
