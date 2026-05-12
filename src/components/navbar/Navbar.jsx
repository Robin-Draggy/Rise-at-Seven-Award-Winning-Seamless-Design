import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CircleChevronUp, Menu, Plus, X } from "lucide-react";
import Button from "../buttons/Button";
import { links } from "../../data/Navlinks";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openMobileIndex, setOpenMobileIndex] = useState(null);
  
  const subLinksRef = useRef([]);

  const setSubLinkRef = (el, i) => {
    subLinksRef.current[i] = el;
  };

  const activeItem = activeIndex !== null ? links[activeIndex] : null;

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenu]);

  const dropdownRef = useRef(null);
  const [width, setWidth] = useState("auto");
  const isTwoColumn = activeItem?.subLinks?.length > 3;

  useEffect(() => {
    if (dropdownRef.current) {
      setWidth(dropdownRef.current.scrollWidth);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!activeItem?.subLinks) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        subLinksRef.current,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.2,
          ease: "power3.out",
          delay: 0.2,
        },
      );
    });

    return () => ctx.revert();
  }, [activeItem]);

  return (
    <div className="relative z-40 text-white lg:z-40">
      {/* DESKTOP BACKDROP */}
      <div
        className={`fixed inset-0 z-10 transition-all duration-500 ${
          activeItem?.dropdown
            ? "opacity-100 backdrop-blur-md bg-black/20 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-999 bg-black/10 m-2 rounded-4xl backdrop-blur-lg transition-all duration-500 lg:hidden ${
          mobileMenu
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* MOBILE CONTENT */}
        <div
          className={`flex h-full flex-col px-4 py-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileMenu
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          }`}
        >
          {/* TOP */}
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <div className="w-36">
              <svg
                class="w-full h-full object-contain fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 168 21"
                f="none"
              >
                <path d="M91.3152 5.40061C91.3152 3.94241 92.5306 2.67359 93.9881 2.67359C95.7162 2.67359 96.797 3.83419 96.797 5.56225H99.7127C99.7127 2.1873 97.3096 0 93.9874 0C90.9371 0 88.3988 2.32257 88.3988 5.42766C88.3988 9.31596 90.883 10.2344 93.9874 11.4221C95.6627 12.07 97.2007 12.5563 97.2007 14.6895C97.2007 16.634 95.9867 18.0651 93.9874 18.0651C91.8813 18.0651 90.7477 16.3905 90.7477 14.446H87.832C87.832 18.0651 90.3426 20.7381 93.9874 20.7381C97.6323 20.7381 100.118 18.2816 100.118 14.6895C100.118 7.10161 91.3145 9.64061 91.3145 5.40061H91.3152Z"></path>
                <path d="M109.209 4.99609C104.834 4.99609 101.539 8.53405 101.539 12.8539C101.539 17.1737 104.888 20.738 109.155 20.738C112.422 20.738 115.203 18.713 116.337 15.662H113.529C112.718 17.2278 111.017 18.1733 109.262 18.1733C106.806 18.1733 104.915 16.4182 104.348 14.0963H116.743C116.797 13.6371 116.823 13.1508 116.823 12.6922C116.823 8.47926 113.447 4.99609 109.209 4.99609ZM104.348 11.9361C104.509 9.47823 106.751 7.56147 109.181 7.56147C111.611 7.56147 113.853 9.47823 114.014 11.9361H104.348Z"></path>
                <path d="M127.476 5.40039L123.575 16.0941L119.673 5.40039H116.676L122.617 20.3598H124.588L130.475 5.40039H127.476Z"></path>
                <path d="M137.942 4.99609C133.567 4.99609 130.273 8.53405 130.273 12.8539C130.273 17.1737 133.621 20.738 137.888 20.738C141.155 20.738 143.936 18.713 145.071 15.662H142.262C141.453 17.2278 139.75 18.1733 137.996 18.1733C135.538 18.1733 133.649 16.4182 133.081 14.0963H145.476C145.53 13.6371 145.556 13.1508 145.556 12.6922C145.556 8.47926 142.182 4.99609 137.942 4.99609ZM133.081 11.9361C133.243 9.47823 135.484 7.56147 137.915 7.56147C140.347 7.56147 142.586 9.47823 142.749 11.9361H133.081Z"></path>
                <path d="M147.473 8.21195V8.69013V20.3618H150.032V10.1815L167.216 20.3618V17.2405L147.473 5.40039V8.21195Z"></path>
                <path d="M67.8431 7.50804H67.789C66.6818 5.80635 64.7103 4.99609 62.713 4.99609C58.1775 4.99609 54.7734 8.3981 54.7734 12.935C54.7734 17.4719 58.2296 20.7387 62.713 20.7387C64.7651 20.7387 66.7359 19.8473 67.789 18.0387H67.8431V20.3606H70.652V5.40122H67.8431V7.50804ZM62.686 18.1733C59.823 18.1733 57.5823 15.7168 57.5823 12.9073C57.5823 10.0978 59.7425 7.56079 62.7124 7.56079C65.6822 7.56079 67.8972 9.90973 67.8972 12.9073C67.8972 15.9048 65.6024 18.1733 62.6867 18.1733H62.686Z"></path>
                <path d="M77.5832 0.378906H74.7736V5.40144H72.75V7.96681H74.7736V20.3608H77.5832V7.96681H80.0403V5.40144H77.5832V0.378906Z"></path>
                <path d="M18.3089 0.378906H15.5V3.2953H18.3089V0.378906Z"></path>
                <path d="M18.3089 5.02344H15.5V19.9828H18.3089V5.02344Z"></path>
                <path d="M25.8409 10.7205C24.8142 10.3959 23.5183 10.0996 23.5183 8.77603C23.5183 7.77639 24.3279 7.18256 25.2728 7.18256C26.4077 7.18256 27.0549 7.91166 27.1895 8.99178H29.9984C29.9443 6.39935 27.9727 4.61719 25.4087 4.61719C22.8447 4.61719 20.7088 6.3723 20.7088 8.93767C20.7088 14.2307 27.5412 12.6102 27.5412 15.743C27.5412 17.0389 26.6227 17.7951 25.381 17.7951C23.707 17.7951 22.9516 16.6074 22.8427 15.0681H20.0352C20.0352 17.417 21.1951 19.2269 23.4094 20.0094C24.0303 20.2252 24.6789 20.3604 25.3262 20.3604C28.1892 20.3604 30.3494 18.5248 30.3494 15.5807C30.3494 12.6366 28.296 11.476 25.8402 10.7205H25.8409Z"></path>
                <path d="M39.3637 4.61719C34.9891 4.61719 31.6953 8.15514 31.6953 12.475C31.6953 16.7948 35.0432 20.3591 39.3096 20.3591C42.577 20.3591 45.3581 18.3341 46.493 15.2831H43.6842C42.8746 16.8489 41.1722 17.7944 39.4178 17.7944C36.96 17.7944 35.0709 16.0393 34.5028 13.7174H46.8975C46.9516 13.2582 46.978 12.7719 46.978 12.3133C46.978 8.10036 43.6037 4.61719 39.3637 4.61719ZM34.5028 11.5565C34.6651 9.09864 36.9059 7.18188 39.3373 7.18188C41.7688 7.18188 44.0075 9.09932 44.1705 11.5565H34.5028Z"></path>
                <path d="M9.55945 12.1512C12.1519 11.2327 13.3395 9.09953 13.3395 6.39957C13.3395 4.67151 12.7728 2.88934 11.5046 1.67395C10.0998 0.297591 8.07419 0 6.18314 0H0V19.9826H2.91572V13.8069L13.3389 19.9826V16.8606L6.22575 12.5949L7.61496 12.5293C8.26222 12.5293 8.96359 12.3676 9.55809 12.1512H9.55945ZM4.91499 10.3156H2.91572V2.67359H5.99444C8.317 2.67359 10.4231 3.86192 10.4231 6.40024C10.4231 9.5865 7.50742 10.3156 4.91499 10.3156Z"></path>
                <path d="M164.759 7.94414L166.061 8.71517V8.08955L165.395 7.69051C165.437 7.68172 165.48 7.66954 165.521 7.65466C165.869 7.53157 166.061 7.24209 166.061 6.84034C166.061 6.57725 165.966 6.33579 165.801 6.17753C165.583 5.9638 165.277 5.93945 165.065 5.93945H164.191V8.63807H164.758V7.94346L164.759 7.94414ZM164.908 7.22856H164.76V6.47715H165.043C165.261 6.47715 165.495 6.57251 165.495 6.84102C165.495 7.10953 165.297 7.22856 164.908 7.22856H164.908Z"></path>
                <path d="M165.127 10.1622C166.714 10.1622 168 8.87583 168 7.28913C168 5.70242 166.714 4.41602 165.127 4.41602C163.54 4.41602 162.254 5.70242 162.254 7.28913C162.254 8.87583 163.54 10.1622 165.127 10.1622ZM165.127 5.22763C166.264 5.22763 167.189 6.15219 167.189 7.28913C167.189 8.42606 166.264 9.35062 165.127 9.35062C163.99 9.35062 163.066 8.42606 163.066 7.28913C163.066 6.15219 163.99 5.22763 165.127 5.22763Z"></path>
              </svg>
            </div>

            {/* CLOSE */}
            <button
              onClick={() => setMobileMenu(false)}
              className="flex  items-center justify-center rounded-full "
            >
              <X size={25} />
            </button>
          </div>

          {/* LINKS */}
          <div className="mt-7 flex flex-1 flex-col leading-7">
            {links.map((link, i) => (
              <div key={i} className="mb-2">
                {/* MAIN LINK */}
                <button
                  onClick={() => {
                    if (!link.subLinks) return;
                    setOpenMobileIndex(openMobileIndex === i ? null : i);
                  }}
                  className="group flex w-full items-center justify-between text-[2.2rem] font-medium"
                >
                  <span>{link.label}</span>

                  {link.subLinks && (
                    <div
                      className={`flex h-8 w-8 items-center justify-center transition-all duration-300 ${
                        openMobileIndex === i
                          ? "rotate-180"
                          : "group-hover:rotate-90 group-hover:bg-white group-hover:text-black"
                      }`}
                    >
                      <CircleChevronUp size={28} />
                    </div>
                  )}
                </button>

                {/* SUB LINKS */}
                {link.subLinks && (
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      openMobileIndex === i
                        ? "max-h-40 opacity-100 mt-4 pb-2"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="flex flex-col gap-3">
                      {link.subLinks.map((sub, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="block text-xl font-semibold text-white transition-all duration-300"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <div className="mt-auto pb-2">
            <Button title="Get In Touch" />
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="relative z-30 flex items-center justify-between">
        {/* LOGO */}
        <div className="w-42 shrink-0">
          <svg
            class="w-full h-full object-contain fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 168 21"
            f="none"
          >
            <path d="M91.3152 5.40061C91.3152 3.94241 92.5306 2.67359 93.9881 2.67359C95.7162 2.67359 96.797 3.83419 96.797 5.56225H99.7127C99.7127 2.1873 97.3096 0 93.9874 0C90.9371 0 88.3988 2.32257 88.3988 5.42766C88.3988 9.31596 90.883 10.2344 93.9874 11.4221C95.6627 12.07 97.2007 12.5563 97.2007 14.6895C97.2007 16.634 95.9867 18.0651 93.9874 18.0651C91.8813 18.0651 90.7477 16.3905 90.7477 14.446H87.832C87.832 18.0651 90.3426 20.7381 93.9874 20.7381C97.6323 20.7381 100.118 18.2816 100.118 14.6895C100.118 7.10161 91.3145 9.64061 91.3145 5.40061H91.3152Z"></path>
            <path d="M109.209 4.99609C104.834 4.99609 101.539 8.53405 101.539 12.8539C101.539 17.1737 104.888 20.738 109.155 20.738C112.422 20.738 115.203 18.713 116.337 15.662H113.529C112.718 17.2278 111.017 18.1733 109.262 18.1733C106.806 18.1733 104.915 16.4182 104.348 14.0963H116.743C116.797 13.6371 116.823 13.1508 116.823 12.6922C116.823 8.47926 113.447 4.99609 109.209 4.99609ZM104.348 11.9361C104.509 9.47823 106.751 7.56147 109.181 7.56147C111.611 7.56147 113.853 9.47823 114.014 11.9361H104.348Z"></path>
            <path d="M127.476 5.40039L123.575 16.0941L119.673 5.40039H116.676L122.617 20.3598H124.588L130.475 5.40039H127.476Z"></path>
            <path d="M137.942 4.99609C133.567 4.99609 130.273 8.53405 130.273 12.8539C130.273 17.1737 133.621 20.738 137.888 20.738C141.155 20.738 143.936 18.713 145.071 15.662H142.262C141.453 17.2278 139.75 18.1733 137.996 18.1733C135.538 18.1733 133.649 16.4182 133.081 14.0963H145.476C145.53 13.6371 145.556 13.1508 145.556 12.6922C145.556 8.47926 142.182 4.99609 137.942 4.99609ZM133.081 11.9361C133.243 9.47823 135.484 7.56147 137.915 7.56147C140.347 7.56147 142.586 9.47823 142.749 11.9361H133.081Z"></path>
            <path d="M147.473 8.21195V8.69013V20.3618H150.032V10.1815L167.216 20.3618V17.2405L147.473 5.40039V8.21195Z"></path>
            <path d="M67.8431 7.50804H67.789C66.6818 5.80635 64.7103 4.99609 62.713 4.99609C58.1775 4.99609 54.7734 8.3981 54.7734 12.935C54.7734 17.4719 58.2296 20.7387 62.713 20.7387C64.7651 20.7387 66.7359 19.8473 67.789 18.0387H67.8431V20.3606H70.652V5.40122H67.8431V7.50804ZM62.686 18.1733C59.823 18.1733 57.5823 15.7168 57.5823 12.9073C57.5823 10.0978 59.7425 7.56079 62.7124 7.56079C65.6822 7.56079 67.8972 9.90973 67.8972 12.9073C67.8972 15.9048 65.6024 18.1733 62.6867 18.1733H62.686Z"></path>
            <path d="M77.5832 0.378906H74.7736V5.40144H72.75V7.96681H74.7736V20.3608H77.5832V7.96681H80.0403V5.40144H77.5832V0.378906Z"></path>
            <path d="M18.3089 0.378906H15.5V3.2953H18.3089V0.378906Z"></path>
            <path d="M18.3089 5.02344H15.5V19.9828H18.3089V5.02344Z"></path>
            <path d="M25.8409 10.7205C24.8142 10.3959 23.5183 10.0996 23.5183 8.77603C23.5183 7.77639 24.3279 7.18256 25.2728 7.18256C26.4077 7.18256 27.0549 7.91166 27.1895 8.99178H29.9984C29.9443 6.39935 27.9727 4.61719 25.4087 4.61719C22.8447 4.61719 20.7088 6.3723 20.7088 8.93767C20.7088 14.2307 27.5412 12.6102 27.5412 15.743C27.5412 17.0389 26.6227 17.7951 25.381 17.7951C23.707 17.7951 22.9516 16.6074 22.8427 15.0681H20.0352C20.0352 17.417 21.1951 19.2269 23.4094 20.0094C24.0303 20.2252 24.6789 20.3604 25.3262 20.3604C28.1892 20.3604 30.3494 18.5248 30.3494 15.5807C30.3494 12.6366 28.296 11.476 25.8402 10.7205H25.8409Z"></path>
            <path d="M39.3637 4.61719C34.9891 4.61719 31.6953 8.15514 31.6953 12.475C31.6953 16.7948 35.0432 20.3591 39.3096 20.3591C42.577 20.3591 45.3581 18.3341 46.493 15.2831H43.6842C42.8746 16.8489 41.1722 17.7944 39.4178 17.7944C36.96 17.7944 35.0709 16.0393 34.5028 13.7174H46.8975C46.9516 13.2582 46.978 12.7719 46.978 12.3133C46.978 8.10036 43.6037 4.61719 39.3637 4.61719ZM34.5028 11.5565C34.6651 9.09864 36.9059 7.18188 39.3373 7.18188C41.7688 7.18188 44.0075 9.09932 44.1705 11.5565H34.5028Z"></path>
            <path d="M9.55945 12.1512C12.1519 11.2327 13.3395 9.09953 13.3395 6.39957C13.3395 4.67151 12.7728 2.88934 11.5046 1.67395C10.0998 0.297591 8.07419 0 6.18314 0H0V19.9826H2.91572V13.8069L13.3389 19.9826V16.8606L6.22575 12.5949L7.61496 12.5293C8.26222 12.5293 8.96359 12.3676 9.55809 12.1512H9.55945ZM4.91499 10.3156H2.91572V2.67359H5.99444C8.317 2.67359 10.4231 3.86192 10.4231 6.40024C10.4231 9.5865 7.50742 10.3156 4.91499 10.3156Z"></path>
            <path d="M164.759 7.94414L166.061 8.71517V8.08955L165.395 7.69051C165.437 7.68172 165.48 7.66954 165.521 7.65466C165.869 7.53157 166.061 7.24209 166.061 6.84034C166.061 6.57725 165.966 6.33579 165.801 6.17753C165.583 5.9638 165.277 5.93945 165.065 5.93945H164.191V8.63807H164.758V7.94346L164.759 7.94414ZM164.908 7.22856H164.76V6.47715H165.043C165.261 6.47715 165.495 6.57251 165.495 6.84102C165.495 7.10953 165.297 7.22856 164.908 7.22856H164.908Z"></path>
            <path d="M165.127 10.1622C166.714 10.1622 168 8.87583 168 7.28913C168 5.70242 166.714 4.41602 165.127 4.41602C163.54 4.41602 162.254 5.70242 162.254 7.28913C162.254 8.87583 163.54 10.1622 165.127 10.1622ZM165.127 5.22763C166.264 5.22763 167.189 6.15219 167.189 7.28913C167.189 8.42606 166.264 9.35062 165.127 9.35062C163.99 9.35062 163.066 8.42606 163.066 7.28913C163.066 6.15219 163.99 5.22763 165.127 5.22763Z"></path>
          </svg>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden items-center lg:flex">
          {links.map((link, i) => (
            <div
              key={i}
              className="relative"
              onMouseEnter={() => {
                if (link.dropdown) {
                  setActiveIndex(i);
                } else {
                  setActiveIndex(null);
                }
              }}
            >
              <a
                href="#"
                className="flex items-center gap-1 rounded-full px-4 py-2.5 text-md font-medium transition-all duration-500 ease-out hover:bg-[#F1f1f1] hover:text-black"
              >
                <span className="tracking-tight">{link.label}</span>

                {link.dropdown && (
                  <Plus
                    size={14}
                    className="transition-transform duration-500"
                  />
                )}
              </a>
            </div>
          ))}
        </div>

        {/* DESKTOP BUTTON */}
        <div className="hidden lg:block">
          <Button title="Get in touch" />
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileMenu(true)}
          className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className="h-0.5 w-5 bg-white"></span>
          <span className="h-0.5 w-5 bg-white"></span>
        </button>
      </div>

      {/* DESKTOP DROPDOWN */}
      <div
        onMouseLeave={() => setActiveIndex(null)}
        className={`absolute left-1/2 top-full z-50 hidden lg:block -translate-x-1/2 pt-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          activeItem?.dropdown
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div
          className={`
      w-[82vw]
      overflow-hidden
      rounded-3xl
      border border-white/10
      bg-white/95
      shadow-2xl
      backdrop-blur-2xl
      transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
      ${
        isTwoColumn
          ? "max-w-[56rem] min-w-[44rem]"
          : "max-w-[44rem] min-w-[36rem]"
      }
    `}
        >
          <div className="flex justify-between gap-10 p-3">
            {/* LEFT */}
            <div className="flex flex-col justify-center p-4">
              <h3 className="text-lg font-medium text-gray-600">
                {activeItem?.content?.title}
              </h3>

              {/* SUB LINKS */}
              {activeItem?.subLinks && (
                <div
                  className={`mt-4 grid gap-2 text-sm text-black/70 ${
                    isTwoColumn ? "grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {activeItem.subLinks.map((sub, i) => (
                    <a
                      key={i}
                      ref={(el) => setSubLinkRef(el, i)}
                      href="#"
                      className="text-xl font-medium text-black hover:opacity-70 transition"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT IMAGE */}
            <div
              className={`
          flex-shrink-0 overflow-hidden rounded-2xl transition-all duration-500 w-[320px]
        `}
            >
              <img
                src={activeItem?.content.image}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
