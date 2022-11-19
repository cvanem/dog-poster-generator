import useBreeds from '../../hooks/useBreeds';
import { useSelectBreed } from '../../store/global';
import AutoCompleteSelector from '../input/AutoCompleteSelector';
import { useAppSelector } from '../../store/store';

export default function SubBreedSelector({ id, value, placeholder = 'Please select subbreed...' }) {
  const { loading } = useBreeds({ trigger: false });
  const options = useAppSelector(state => state.global.breeds[state.global.selected[id]?.breed] ?? []);
  const selectBreed = useSelectBreed();
  return (
    <AutoCompleteSelector
      value={value}
      loading={loading}
      disabled={loading || options.length === 0}
      placeholder={options.length === 0 ? 'No sub breeds available' : placeholder}
      onChange={subBreed => selectBreed({ id, subBreed })}
      options={options ?? []}
    />
  );
}
