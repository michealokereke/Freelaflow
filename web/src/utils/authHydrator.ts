import { useMeQuery } from "@/store/api/endpoints/auth";
import { clearUser, setUser } from "@/store/slices/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useAuthHydrator = async () => {
  const { data, isError, refetch, isLoading, isSuccess } = useMeQuery(
    undefined,
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log(isSuccess, data);
    if (isSuccess && data?.user) {
      dispatch(setUser(data.user));
    }

    if (isError && !isLoading) {
      dispatch(clearUser());
      router.push("/login");
    }
  }, [isError, isSuccess, isLoading, data, dispatch]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await refetch();
        if (res?.data?.user) {
          dispatch(setUser(res.data.user));
        } else {
          dispatch(clearUser());
          router.push("/login");
        }
      } catch (e) {
        dispatch(clearUser());
        router.push("/login");
      }
    }, 15 * 60 * 1000 + 1);

    return () => clearInterval(interval);
  }, [refetch, dispatch, router]);
};
