'use client'
import Button from "@/components/ui/Button";
import scrollToTop from "@/utils/scrollToTop";

const Footer = () => {
  return (
    <footer className='bg-gray'>
      <Button variant="secondary" className='mx-auto flex justify-center' onClick={scrollToTop}>Up</Button>
    </footer>
  );
};

export default Footer;
