import { useRouter } from "next/router";

export default function Index({ callback, error, render }) {
  const bool = callback();

  const router = useRouter();

  if (!bool)  {
    router.push(error)
  }else {
    return render;
  };

}
