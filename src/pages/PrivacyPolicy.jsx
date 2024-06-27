import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import '../style/PrivacyPolicyPage.scss';

const PrivacyPolicy = () => {
    return (
        <Box className='page__default__style'>
            <Heading mb='10'>
                Privacy Policy
            </Heading>

            <Text mb='4'>
                Privacy is one of our main priorities on the Mimi Lottery website (https://mimilottery.netlify.app/). Detailed information about what information we collect from our users and how we use it is documented here.
            </Text>

            <Text mb='4'>
                If you have any questions or need more information about our privacy policy, please feel free to contact us.
            </Text>

            <Text mb='4'>
                This privacy policy applies only to the online activities of ours and the information shared by our website visitors and/or collected from the Mimi Lottery website is valid. This policy is not applicable to any information collected offline or through channels other than this website.
            </Text>

            <Heading size={'1xl'} mb='4'>
                Consent
            </Heading>
            <Text mb='4'>
                By using our website, you hereby consent to our privacy policy and agree to its terms and conditions.
            </Text>

            <Heading size={'1xl'} mb='4'>
                What information do we collect?
            </Heading>
            <Text mb='4'>
                When we ask you to provide your personal information on the website, it will be clearly stated why you are asked to provide it.
            </Text>
            
            <Text mb='4'>
                If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments, and any other information you choose to provide.
            </Text>

            <Text mb='4'>
                When you open an account on our website, you may need to provide some personal information such as your name, email address, photo, mobile number, Discord username, address, etc. Additionally, we may ask for additional information based on necessity with your permission. We do not share your information without your consent and maintain the confidentiality of the information.
            </Text>

            <Heading size={'1xl'} mb='4'>
                Privacy of Personal Passwords
            </Heading>
            <Text mb='4'>
                When you create an account on our website and are asked to log in, we encrypt and securely store your password in our database during storage. Therefore, we ourselves do not see the actual content of your password. Thus, the privacy of your password is properly protected on our website. Additionally, we request that you never share your password with anyone. If you believe your password has been obtained by someone else in any way, please change your password immediately from the website. If you are unable to change your password for any reason, contact our support.
            </Text>

            <Heading size='1xl' mb='4'>
                How do we use your information?
            </Heading>
            <Text mb='4'>
                We use the information we collect from you in various ways such as:
            </Text>

            <Text mb='4'>
                1. Displaying, managing, and monitoring information on our website.
            </Text>

            <Text mb='4'>
                2. Enhancing browsing experience on our website.
            </Text>

            <Text mb='4'>
                3. Analyzing how you use our website.
            </Text>

            <Text mb='4'>
                4. Developing new products, services, and features.
            </Text>

            <Text mb='4'>
                5. Keeping you informed about our new products, services, or updates and contacting you directly or indirectly for marketing purposes of the website.
            </Text>

            <Text mb='4'>
                6. Sending you direct emails.
            </Text>

            <Text mb='4'>
                7. Combating any type of unauthorized online or offline deception.
            </Text>

            <Heading size='1xl' mb='4'>
                Log File
            </Heading>
            <Text mb='4'>
                Mimi Lottery uses log files as a standard method. When visitors visit the website, this file saves visitor logs. All hosting companies do this as part of hosting services analysis. The log file stores information such as - Internet Protocol (IP) address, type of browser, Internet Service Provider, date and time, referring page, etc. These are not personally identifiable information. The purpose of this information is to analyze trends, administer the site, track user movements on the website, and gather demographic information.
            </Text>

            <Heading size='1xl' mb='4'>
                Cookies
            </Heading>
            <Text mb='4'>
                Like all other websites, the Mimi Lottery website uses cookies. These cookies are used to store information including visitor preferences and the pages accessed or visited by the visitor on the website. The information is used to customize the content of our web page based on visitors' browser type and/or other information.
            </Text>

            <Heading size='1xl' mb='4'>
                Privacy of Children's Information
            </Heading>
            <Text mb='4'>
                Another part of our priority is to add protection for children using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activities. Mimi Lottery does not knowingly collect any personally identifiable information from children under the age of thirteen (13). If you believe that your child has provided this kind of information on our website, we strongly encourage you to contact us immediately and we will make our best efforts to promptly remove such information from our records.
            </Text>
        </Box>
    );
};

export default PrivacyPolicy;
