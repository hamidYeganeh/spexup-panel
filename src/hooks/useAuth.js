import { useContext } from 'react';
import { AuthContext } from 'src/contexts/JWTContext';

export const useAuth = () => useContext(AuthContext);
