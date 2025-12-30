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

const page = () => {
  const pages = [
    <FirstPage key="page-1" />,
    <SecondPage key="page-2" />,
    <ThirdPage key="page-3" />,
    <ForthPage key="page-4" />,
    <FifthPage key="page-5" />,
    <SixthPage key="page-6" />,
    <SeventhPage key="page-7" />,
    <EigthPage key="page-8" />,
    <NinthPage key="page-9" />,
    <TenthPage key="page-10" />,
    <EleventhPage key="page-11" />,
    <TwevelthPage key="page-12" />,
    <ThirteenthPage key="page-13" />,
    <ForteenPage key="page-14" />,
    <FifteenthPage key="page-15" />,
  ];

  return (
    <>
      <BookFlip pages={pages} />
      <AuthModal />
    </>
  );
};

export default page;
