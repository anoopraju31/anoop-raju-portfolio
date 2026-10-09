import type { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
