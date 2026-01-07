"use client";

import EigthPage from "@/components/book/EigthPage";
import EleventhPage from "@/components/book/EleventhPage";
import FifteenthPage from "@/components/book/FifteenthPage";
import FifthPage from "@/components/book/FifthPage";
import FirstPage from "@/components/book/FirstPage";
import ForteenPage from "@/components/book/ForteenPage";
import ForthPage from "@/components/book/ForthPage";
import NinthPage from "@/components/book/NinthPage";
import SecondPage from "@/components/book/SecondPage";
import SeventhPage from "@/components/book/SeventhPage";
import SixthPage from "@/components/book/SixthPage";
import TenthPage from "@/components/book/TenthPage";
import ThirdPage from "@/components/book/ThirdPage";
import ThirteenthPage from "@/components/book/ThirteenthPage";
import TwevelthPage from "@/components/book/TwevelthPage";
import { AuthModal } from "@/components/auth/AuthModal";
import { BookFlip } from "@/components/book/BookFlip";
import Sponser from "@/components/book/Sponser";

const page = () => {
  const pages = [
    <EigthPage key="page-1" />,
    <TenthPage key="page-2" />,
    <NinthPage key="page-3" />,
    <EleventhPage key="page-4" />,
    <FifteenthPage key="page-4" />,
    <TwevelthPage key="page-6" />,
    <Sponser key="page-7" />,
    <ThirteenthPage key="page-8" />,
    <ForteenPage key="page-9" />,
    <FifthPage key="page-10" />,
    <SixthPage key="page-11" />,
    <SeventhPage key="page-12" />,
    <ForthPage key="page-13" />,
    <SecondPage key="page-14" />,
    <ThirdPage key="page-15" />,
    <FirstPage key="page-16" />,
  ];

  return (
    <>
      <BookFlip pages={pages} />
      <AuthModal />
    </>
  );
};

export default page;

// const page = () => {
//   return (
//     <div>
//       <EigthPage />
//       <TenthPage />
//       <NinthPage />
//       <EleventhPage />
//       <FifteenthPage />
//       <TwevelthPage />
//       <Sponser />
//       <ThirteenthPage />
//       <ForteenPage />
//       <FifthPage />
//       <SixthPage />
//       <SeventhPage />
//       <ForthPage />
//       <SecondPage />
//       <ThirdPage />
//       <FirstPage />

//     </div>
//   );
// };

// export default page;
