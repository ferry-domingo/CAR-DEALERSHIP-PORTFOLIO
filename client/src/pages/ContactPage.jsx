import SectionHeading from '../components/SectionHeading.jsx';
import InquiryModalButton from '../components/InquiryModalButton.jsx';

export default function ContactPage(){return <section className="section-pad bg-zinc-50"><div className="container-shell"><div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 text-center shadow-sm sm:p-12"><SectionHeading eyebrow="Inquiry" title="Ready to Drive BYD?" subtitle="Have questions about a model, financing, or a test drive? Send an inquiry and Rafael will get back to you."/><div className="mt-8"><InquiryModalButton label="Open Inquiry Form"/></div></div></div></section>}
