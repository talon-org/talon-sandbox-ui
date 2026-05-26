import OriginalFooter from 'dumi/theme-original/slots/Footer';

export default function Footer() {
  return (
    <>
      <style>{`
        .rc-footer,
        .rc-footer[class*='-footer'],
        .rc-footer-bottom,
        .rc-footer[class*='-footer'] .rc-footer-bottom {
          background: transparent !important;
          box-shadow: none !important;
        }
      `}</style>
      <OriginalFooter />
    </>
  );
}
