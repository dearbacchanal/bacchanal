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

import { BookDataProvider } from "@/components/book/BookDataContext";
import { useEffect, useState } from "react";

const BookPage = () => {
  const [data, setData] = useState<{ textData: Record<string, string>; images: Record<string, string> }>({ textData: {}, images: {} });
  const [loading, setLoading] = useState(true);

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
        const boxData: Record<string, any> = {};
        const dynamicBoxes: Record<string, string[]> = {};

        // Extract box settings and dynamic boxes from textData
        Object.keys(textData).forEach(key => {
          if (key.startsWith('box-settings-')) {
            const id = key.replace('box-settings-', '');
            try {
              boxData[id] = JSON.parse(textData[key]);
            } catch (e) {
              console.error("Error parsing box settings in provider:", e);
            }
          } else if (key.startsWith('dynamic-boxes-')) {
            const pageId = key.replace('dynamic-boxes-', '');
            try {
              dynamicBoxes[pageId] = JSON.parse(textData[key]);
            } catch (e) {
              console.error("Error parsing dynamic boxes in provider:", e);
            }
          }
        });

        setData({
          textData,
          images: imgResult.images || {}
        });
        setBoxData(boxData);
        setDynamicBoxes(dynamicBoxes);
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [boxData, setBoxData] = useState<Record<string, any>>({});
  const [dynamicBoxes, setDynamicBoxes] = useState<Record<string, string[]>>({});

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
    <FirstPage key="page-16" />,
  ];

  return (
    <BookDataProvider textData={data.textData} images={data.images} boxData={boxData} dynamicBoxes={dynamicBoxes} isLoading={loading}>
      <BookFlip pages={pages} />
      <AuthModal />
    </BookDataProvider>
  );
};

export default BookPage;

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
