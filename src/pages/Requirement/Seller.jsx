import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { usePDF } from 'react-to-pdf';
import './Seller.scss';
const Component = () => {
   const { toPDF, targetRef } = usePDF({filename: 'page.pdf',page:{format:'A4', orientation: 'portrait'}});
   return (
      <div className='seller__content__main__container'>
         <button onClick={() => toPDF()}>Download PDF</button>
         <div ref={targetRef} className='main'> 
            <Image src='/cover.png' alt='logo'/>
            <Box className='niyog__container'>
                <Box ref={targetRef} className='niyog__content'>
                    <Heading textAlign={'center'} as="h2" size="lg" mb={4} className='niyog__heading'>
                        গ্লোবাল লটারি বিক্রেতা নিয়োগ
                    </Heading>
                    <Text fontSize="md" mb={2} className='niyog__text'>
                        <strong>আমাদের সম্পর্কে:</strong> গ্লোবাল লটারি একটি বিশ্বব্যাপী লটারি প্ল্যাটফর্ম। আমরা লটারি টিকিট বিক্রির জন্য উৎসাহী বিক্রেতা খুঁজছি।
                    </Text>
                    <Text fontSize="md" mb={2} className='niyog__text'>
                        <strong>পদবী:</strong> লটারি বিক্রেতা
                    </Text>
                    <Text fontSize="md" mb={2} className='niyog__text'>
                        <strong>অবস্থান:</strong> রিমোট
                    </Text>
                    <Text fontSize="md" mb={2} className='niyog__text'>
                        <strong>ধরন:</strong> ফুল-টাইম/পার্ট-টাইম
                    </Text>
                    <Text fontSize="md" mb={2} className='niyog__text'>
                        <strong>পারিশ্রমিক:</strong> কমিশন ভিত্তিক (৫ টাকা প্রতিটি বিক্রয়ে লটারী প্রাইস ৩০ টাকা)
                    </Text>
                    <Text fontSize="md" mb={2} className='niyog__text'>
                        <strong>কাজের বিবরণ:</strong>
                        <ul>
                            <li>লটারি টিকিট বিক্রি</li>
                            <li>গ্রাহক সেবা</li>
                            <li>টিকিট প্রচার</li>
                        </ul>
                    </Text>
                    <Text fontSize="md" mb={2} className='niyog__text'>
                        <strong>যোগ্যতা:</strong>
                        <ul>
                            <li>ভাল যোগাযোগ দক্ষতা</li>
                            <li>বিক্রয়ে আগ্রহী</li>
                            <li>অনলাইনে কাজের অভিজ্ঞতা</li>
                            <li>বিকাশ / নগদ / রকেট /উপায় এর যেকোনো একটির এজেন্ট হতে হবে অথবা ফেইসবুক পেজ, youtuber বা কনটেন্ট ক্রিয়েট হতে হবে যাতে ক্রেতা মোবাইল ব্যাঙ্কিং এর মাধ্যমে ক্রয় করতে পারে </li>
                        </ul>
                    </Text>
                    <Text fontSize="md" mb={2} className='niyog__text'>
                        <strong>সুবিধাসমূহ:</strong>
                        <ul>
                        <li>নমনীয় সময়</li>
                        <li>আকর্ষণীয় কমিশন</li>
                        <li>ক্যারিয়ার উন্নতির সুযোগ</li>
                        <li>যদি তোমার বিক্রয় করা লটারীতে কেউ বিজয়ে হয় তাহলে তোমাকে আমাদের কোম্পানির তরফ থেকে ৫% কমিশন দেয়া হবে টোটাল পুরুস্কার এর যেমন ১ কোটি পুরুস্কার এর ৫ লক্ষ টাকা কমিশন </li>
                        <li>প্রতি মাসে বিক্রেতাদের মাঝে লটারী করা হবে যে বিজয়ী হবে তাকে ৩ লক্ষ টাকা পুরুস্কার দেয়া হবে </li>
                        </ul>
                    </Text>
                    <Text fontSize="md" mb={2} className='niyog__text'>
                        <strong>আবেদন প্রক্রিয়া:</strong> আগ্রহী প্রার্থীরা লিংক এ প্রবেশ করে এপ্লিকেশন এর নিয়মাবলী দেখে আমাদের ওয়েবসাইট এ রেজিস্ট্রেশন করুন ,  আবেদনের শেষ তারিখ: [07/15/2024]
                    </Text>
                    <Text fontSize="md" mb={2} className='niyog__text'>
                        **যোগাযোগের তথ্য:**
                        <ul>
                        <li><strong>ওয়েবসাইট:</strong> <a href="https://globallottery.netlify.app" className='niyog__link'>globallottery.netlify.app</a></li>
                        <li><strong>ইমেইল:</strong> <a href="mailto:teeencard@gmail.com" className='niyog__link'>teeencard@gmail.com</a></li>
                        </ul>
                    </Text>
               </Box> 
           </Box>
         </div>
      </div>
   )
}

export default Component;