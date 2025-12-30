import React from "react";
import { kalufira } from "./Font";
import Image from "next/image";

const ThirteenthPage = () => {
  return (
    <>
      {/* Thirteenth Page */}
      <section className="min-h-screen relative w-full bg-[#009d94] p-8">
        <Image
          src="/assets/layer-17.png"
          alt="Overlay"
          fill
          className="object-cover absolute pointer-events-none"
          priority
        />
        <div className="max-w-7xl mx-auto relative">
          {/* Header */}
          <div className="text-center mb-12 ">
            <h1
              className={`${kalufira.className} text-5xl md:text-7xl font-black text-black mb-2 tracking-tight z-50 `}
            >
              CARNIVAL CALENDAR
            </h1>
          </div>

          {/* Calendar Grid */}
          <div className="grid md:grid-cols-2 gap-8 ">
            {/* January */}
            <div className=" rounded-3xl p-6  ">
              <h2
                className={`${kalufira.className} text-4xl font-black text-black mb-6 text-center`}
              >
                JANUARY
              </h2>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center font-handwritten font-bold text-black text-2xl"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {/* Week 1 */}
                <div className="h-16"></div>
                <div className="h-16"></div>
                <div className="h-16"></div>
                <div className="h-16"></div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">1</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">2</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">3</span>
                </div>

                {/* Week 2 */}
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">4</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">5</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">6</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">7</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">8</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">9</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">10</span>
                </div>

                {/* Week 3 */}
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">11</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">12</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">13</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">14</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">15</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">16</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">17</span>
                </div>

                {/* Week 4 */}
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">18</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">19</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">20</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">21</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">22</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">23</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">24</span>
                </div>

                {/* Week 5 */}
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">25</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">26</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">27</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">28</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">29</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">30</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">31</span>
                </div>
              </div>
            </div>

            {/* February */}
            <div className=" rounded-3xl p-6  ">
              <h2
                className={`${kalufira.className} text-4xl font-black text-black mb-6 text-center`}
              >
                FEBRUARY
              </h2>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center font-black text-black text-2xl font-handwritten"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {/* Week 1 */}
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">1</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">2</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">3</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">4</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">5</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">6</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">7</span>
                </div>

                {/* Week 2 */}
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">8</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">9</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">10</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">11</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">12</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">13</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">14</span>
                </div>

                {/* Week 3 - Carnival Days */}
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">15</span>
                </div>
                <div className=" rotate-[-8deg] ">
                  <span
                    className={`${kalufira.className} text-white hidden sm:block text-[15px] sm:text-lg font-black `}
                    style={{ WebkitTextStroke: "1px black" }}
                  >
                    Carnival
                  </span>
                  <span
                    className={`${kalufira.className} text-white text-[15px] sm:text-lg font-black block -mt-1`}
                    style={{ WebkitTextStroke: "1px black" }}
                  >
                    Monday
                  </span>
                </div>

                <div className=" rotate-[-8deg] ">
                  <span
                    className={`${kalufira.className} text-white text-[15px] sm:text-lg font-black hidden sm:block `}
                    style={{ WebkitTextStroke: "1px black" }}
                  >
                    Carnival
                  </span>
                  <span
                    className={`${kalufira.className} text-white text-[15px] sm:text-lg font-black block -mt-1 relative top-5 sm:top-0`}
                    style={{ WebkitTextStroke: "1px black" }}
                  >
                    Tuseday
                  </span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">18</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">19</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">20</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">21</span>
                </div>

                {/* Week 4 */}
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">22</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">23</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">24</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">25</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">26</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">27</span>
                </div>
                <div className=" rounded-lg flex items-center justify-center h-16 ">
                  <span className="text-2xl  text-black">28</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThirteenthPage;
