import { useAuth } from '@/context/AuthContext';

export const useAppHeaderViewModel = () => {
  const { userProfile, userProfileLoading } = useAuth();

  return {
    userProfile,
    userProfileLoading,
  };
};
