"use client";

import EigthPage from "@/components/book/EigthPage";
import TenthPage from "@/components/book/TenthPage";
import NinthPage from "@/components/book/NinthPage";
import EleventhPage from "@/components/book/EleventhPage";
import FifteenthPage from "@/components/book/FifteenthPage";
import TwevelthPage from "@/components/book/TwevelthPage";
import Sponser from "@/components/book/Sponser";
import ThirteenthPage from "@/components/book/ThirteenthPage";
import ForteenPage from "@/components/book/ForteenPage";
import FifthPage from "@/components/book/FifthPage";
import SixthPage from "@/components/book/SixthPage";
import SeventhPage from "@/components/book/SeventhPage";
import ForthPage from "@/components/book/ForthPage";
import SecondPage from "@/components/book/SecondPage";
import ThirdPage from "@/components/book/ThirdPage";
import FirstPage from "@/components/book/FirstPage";
import { AuthModal } from "@/components/auth/AuthModal";
import { BookFlip } from "@/components/book/BookFlip";
import { BookDataProvider } from "@/components/book/BookDataContext";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { PaymentModal } from "@/components/book/PaymentModal";

const BookPage = () => {
  const [data, setData] = useState<{ textData: Record<string, string>; images: Record<string, string> }>({ textData: {}, images: {} });
  const [loading, setLoading] = useState(true);
  const [boxData, setBoxData] = useState<Record<string, any>>({});
  const [dynamicBoxes, setDynamicBoxes] = useState<Record<string, string[]>>({});

  const { data: session, status } = useSession();
  const isPurchased = session?.user?.isPurchased;
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [textRes, imgRes] = await Promise.all([
          fetch("/api/book-data"),
          fetch("/api/book-images")
        ]);

        const textResult = await textRes.json();
        const imgResult = await imgRes.json();

        const textData = textResult.data || {};
        const newBoxData: Record<string, any> = {};
        const newDynamicBoxes: Record<string, string[]> = {};

        Object.keys(textData).forEach(key => {
          if (key.startsWith('box-settings-')) {
            const id = key.replace('box-settings-', '');
            try {
              newBoxData[id] = JSON.parse(textData[key]);
            } catch (e) {
              console.error("Error parsing box settings in provider:", e);
            }
          } else if (key.startsWith('dynamic-boxes-')) {
            const pageId = key.replace('dynamic-boxes-', '');
            try {
              newDynamicBoxes[pageId] = JSON.parse(textData[key]);
            } catch (e) {
              console.error("Error parsing dynamic boxes in provider:", e);
            }
          }
        });

        setData({
          textData,
          images: imgResult.images || {}
        });
        setBoxData(newBoxData);
        setDynamicBoxes(newDynamicBoxes);
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Pages for PDF generation (without download button to avoid circular reference)
  const pagesForPDF = [
    <EigthPage key="page-1" />,
    <TenthPage key="page-2" />,
    <NinthPage key="page-3" />,
    <EleventhPage key="page-4" />,
    <FifteenthPage key="page-5" />,
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

  // Display pages with download button on last page
  const pages = [
    <EigthPage key="page-1" />,
    <TenthPage key="page-2" />,
    <NinthPage key="page-3" />,
    <EleventhPage key="page-4" />,
    <FifteenthPage key="page-5" />,
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
    <FirstPage key="page-16" pages={pagesForPDF} />,
  ];

  return (
    <BookDataProvider textData={data.textData} images={data.images} boxData={boxData} dynamicBoxes={dynamicBoxes} isLoading={loading}>
      <BookFlip pages={pages} />
      <AuthModal />
    </BookDataProvider>
  );
};

export default BookPage;
