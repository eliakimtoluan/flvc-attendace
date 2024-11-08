import React from "react";

export default function Team() {
  return (
    <React.Fragment>
      <>
        <section
          className="py-24 bg-white"
          style={{
            backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
            backgroundPosition: "center",
          }}
        >
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap items-center justify-between -mx-4 mb-16">
              <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
                <div className="max-w-md">
                  <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-9xl">
                    Team
                  </span>
                  <h3 className="mb-4 text-4xl md:text-5xl font-bold tracking-tighter">
                    Meet our team
                  </h3>
                  <p className="text-lg md:text-xl text-coolGray-500 font-medium">
                    Highly motivated team of FLVC students.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-12">
                <div className="max-w-max mx-auto">
                  <img
                    className="block mb-8"
                    src="https://github.com/shadcn.png"
                    alt=""
                  />
                  <h3 className="mb-2 text-2xl md:text-2xl leading-tight font-semibold">
                    Jansen Mallabo
                  </h3>
                  {/* <span className="text-lg font-medium text-green-500">
                    CEO &amp; Founder
                  </span> */}
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-12">
                <div className="max-w-max mx-auto">
                  <img
                    className="block mb-8"
                    src="https://github.com/shadcn.png"
                    alt=""
                  />
                  <h3 className="mb-2 text-2xl md:text-2xl leading-tight font-semibold">
                    Romel Torres
                  </h3>
                  {/* <span className="text-lg font-medium text-green-500">
                    CTO
                  </span> */}
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-12">
                <div className="max-w-max mx-auto">
                  <img
                    className="block mb-8"
                    src="https://github.com/shadcn.png"
                    alt=""
                  />
                  <h3 className="mb-2 text-2xl md:text-2xl leading-tight font-semibold">
                    Jose Rizal
                  </h3>
                  {/* <span className="text-lg font-medium text-green-500">
                    CPO
                  </span> */}
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-12 lg:mb-0">
                <div className="max-w-max mx-auto">
                  <img
                    className="block mb-8"
                    src="https://github.com/shadcn.png"
                    alt=""
                  />
                  <h3 className="mb-2 text-2xl md:text-2xl leading-tight font-semibold">
                    Antonio Luna
                  </h3>
                  {/* <span className="text-lg font-medium text-green-500">
                    Customer Success
                  </span> */}
                </div>
              </div>
              {/* <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-12 md:mb-0">
                <div className="max-w-max mx-auto">
                  <img
                    className="block mb-8"
                    src="flex-ui-assets/images/teams/photo-employee3.png"
                    alt=""
                  />
                  <h3 className="mb-2 text-2xl md:text-2xl leading-tight font-semibold">
                    Alya Levine
                  </h3>
                  <span className="text-lg font-medium text-green-500">
                    Backend Developer
                  </span>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                <div className="max-w-max mx-auto">
                  <img
                    className="block mb-8"
                    src="flex-ui-assets/images/teams/photo-employee2.png"
                    alt=""
                  />
                  <h3 className="mb-2 text-2xl md:text-2xl leading-tight font-semibold">
                    Rose Hernandez
                  </h3>
                  <span className="text-lg font-medium text-green-500">
                    iOS Developer
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </>
    </React.Fragment>
  );
}
