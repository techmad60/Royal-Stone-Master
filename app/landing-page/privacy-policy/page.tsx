//app/privacy-policy/page.tsx
import Footer from "@/components/Sections/Footer";
import Header from "@/components/Sections/Header";
import DownloadApp from "@/components/ui/DownloadApp";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className={`flex flex-col`}>
      <Header />
      <main className="">
        <div className="flex flex-col px-4 mx-auto lg:max-w-[57.5rem] xl:max-w-[75.5rem] ">
          <section className="flex flex-col justify-start items-start mt-32">
            <h1
              className={`text-color-zero text-lg-base font-extrabold my-4 text-start lg:text-[39px]`}
            >
              Privacy Policy
            </h1>
            <p className="text-sm text-colour-five mb-4 lg:text-base">
            Updated Last: 1st of January, 2025.
            </p>
          </section>
          <section className="flex flex-col justify-start items-start space-y-4 py-4 lg:space-y-20">
            {/* Introduction */}
            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                Introduction
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Hey! At Royal stone, we value your trust and are committed to
                protecting your personal information. We&apos;ve created this Privacy
                Policy (the &quot;Policy&quot;) to describe your privacy rights regarding
                how we collect, use, process, disclose and protect your
                information; including any non-public, personal information
                (Personal Data).
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                This Policy applies to the Personal Data collected by Royal
                stone when you use our website, mobile application, social media
                platforms, tools and any other platform belonging to Royal stone
                (collectively, the &quot;Services&quot;) or otherwise interact with us as
                described below. We may update this Policy from time to time and
                at our sole discretion. Where updates are made to the Policy, we
                will notify you of same by revising the date at the top of this
                Policy, and in some cases, we may provide you with additional
                notice (by adding a statement to the homepages of our website or
                mobile application; or by sending you an email notification).
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                We encourage you to review the Policy whenever you interact with
                us to stay informed about our information privacy practices as
                well as ways in which you can protect your privacy. By accessing
                or choosing to use any of our platforms, you agree to be bound
                by this Policy.
              </p>
            </section>

            {/* Whys? */}
            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                1. Why have a privacy policy?
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Information that identifies or can be used to identify a living
                individual is known as &quot;personal data.&quot; All organizations
                processing personal data must do so fairly and in accordance
                with all applicable data protection laws. This includes the
                obligation for us to tell you how we will use your personal
                data. We treat all of our legal obligations seriously and take
                all steps necessary to ensure compliance when storing and
                processing your personal data.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                2. What personal data do we collect about you and how?
              </h2>

              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                We may collect the following information about you: Your contact
                details such as your name, address, telephone number and email
                address; Your date of birth, nationality, country of birth,
                country of residence, employment status and tax identification
                number (e.g. National Insurance Number); Passport details,
                driving license and utility bills; Details of the services you
                request from us; and Certain additional information which may be
                necessary in order for us to provide particular services to you.
              </p>

              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                We collect your personal data in a number of different ways,
                including (but not limited to) the following: If you provide it
                when communicating with us (for example when registering for our
                services); If you order any of our products or services; If you
                enter a competition or promotion; If you make payments or modify
                your account details; and When you visit our websites (for
                example by cookies, your IP address and other browser-generated
                information).
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                We record all service calls for quality and training purposes,
                to enable us to deal effectively with queries and complaints
                and, in the case of calls where customers place transactions on
                regulated markets, in order to comply with our regulatory
                obligations. In most cases, you are not obliged to provide any
                personal data to us, but if you have requested information or
                you have ordered a service from us, we must obtain, and it is a
                contractual requirement for you to provide, certain information
                so that we can verify your identity and in order for us to meet
                our legal obligations. Please see section 7 below for further
                details.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Some of the information that we collect about you or which you
                provide to us about you or your family members may be special
                category data for the purposes of applicable data protection
                laws. Special category data includes information about physical
                and mental health, racial or ethnic origin, sexual orientation,
                trade union membership and biometric data. We take special care
                of this data in accordance with applicable data protection laws.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                3. How do we use your personal data?
              </h2>

              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                We retain and use your personal data for some or all of the
                following purposes: Security, payment verification, insurance,
                debt tracing and debt recovery; Dealing with any queries,
                complaints or problems reported by you; Enabling you to
                participate in our promotions and competitions; Enabling you to
                participate in the interactive features of the website and
                ensuring content from our website is presented in the most
                Effective manner for you and your computer or device; Notifying
                you about changes to our service and/ or the terms on which the
                services are provided; To ensure the proper operation of our
                systems; To keep our client records up to date; To better
                understand your requirements and provide you with services
                specific to your needs; To comply with applicable laws where we
                are obliged to retain and/or disclose certain information;
                Generating statistics on our users, such as the popularity of
                certain of our services and about the &quot;traffic&quot; visiting our
                websites in order to improve our services to you; and/or To
                provide you with information about goods or services we feel may
                interest you in accordance with applicable laws (please see
                further details on our marketing activities at section 6 below).
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                4. Data Retention
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                We will only keep your personal data for as long as we need to
                in order to fulfil the relevant purpose(s) it was collected for,
                as set out above in this privacy policy and for as long as we
                are required to keep it by law. We retain copies of our customer
                contracts in order to enable us to deal with any legal issues
                along with the information provided to us for identification
                verification checks and anti-money laundering checks (as
                required by law) for 6 years after termination or expiry of our
                contract with you. Details of complaints are retained for 5
                years from receipt. If you have a query in relation to how long
                we retain your personal data for, please contact us using the
                contact details provided below.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                4. Data Retention
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                We will only keep your personal data for as long as we need to
                in order to fulfil the relevant purpose(s) it was collected for,
                as set out above in this privacy policy and for as long as we
                are required to keep it by law. We retain copies of our customer
                contracts in order to enable us to deal with any legal issues
                along with the information provided to us for identification
                verification checks and anti-money laundering checks (as
                required by law) for 6 years after termination or expiry of our
                contract with you. Details of complaints are retained for 5
                years from receipt. If you have a query in relation to how long
                we retain your personal data for, please contact us using the
                contact details provided below.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                5. What is the legal basis upon which we deal with your data?
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Whenever we collect or use your personal data, we will make sure
                we do this for a valid legal reason which will generally include
                at least one of the following reasons: Because it is necessary
                to fulfil the terms of our contract with you; Because it is
                necessary to support the legitimate interests of our business or
                the legitimate interests of others. Whenever we use this legal
                basis, we will undertake a balancing test to ensure that our
                legitimate interests are not outweighed by your personal
                interests or fundamental rights and freedoms which require
                protection. Our legitimate interests are to; Undertake group
                administrative exercises Provide client services Run, develop
                and/ or grow our business; and Undertake market research and
                marketing (nb. please see Section 6 for your rights to opt-out
                of receiving marketing). Because it is necessary to fulfil a
                legal obligation; and/or Where we have obtained your consent -
                we will always make it clear when we need your consent and how
                you can change your permissions and/or withdraw your consent at
                any time thereafter. If you would like to know more about our
                legal basis for using your personal data in any particular way,
                you can contact us at any time using the details at section 13
                below.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                6. Marketing
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                We (or a third party acting for us) may use the information you
                provide us with to keep you informed about products and services
                which we believe you may be interested in, carry out market
                research and/or to review how you use your account in order to
                maximise customer engagement and assess customer satisfaction.
                This information may be sent to you by e mail, SMS, other
                electronic means, telephone and/or post.
              </p>

              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                In most cases, we will only conduct such marketing activities
                where we have obtained your consent, a third party has obtained
                consent on our behalf or otherwise in accordance with applicable
                laws. Depending on the nature of the consent collected, we (or a
                third party acting for us) may carry out targeted electronic
                marketing based on, for example, location or profiling data.
              </p>

              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                In summary, the Soft Opt-In allows a business send direct
                marketing providing it has obtained the contact details of the
                recipient in the course of establishing a service relationship
                (or the sale of a product), the marketing is in respect of
                similar products and services and the legitimate interests
                balancing test set out in section 5 is met.
              </p>

              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                In such circumstances, we will provide you with a simple means
                of opting-out of such marketing at the time that we collect your
                contact details and in any subsequent communications. The Soft
                Opt-In cannot be used to promote third party products and
                services.
              </p>

              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                If you do not want to receive any marketing communications from
                us, you can unsubscribe when we initially obtain your details,
                or by contacting us in writing at any time or by opting out by
                following the opt out instructions on our website or app or
                contained in the relevant telephone, SMS, other electronic
                means, post, or email marketing communication.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Please note that your opting out of marketing communications
                will not prevent us from continuing to communicate with you as
                necessary to manage your account (such service messages may
                include, for example, where we consider it suitable or proper,
                in the circumstances, to make you aware of economic matters
                which may require your attention, and that you may otherwise
                have been unaware). Please refer to www.ii.co.uk for details of
                our products and services. Any such opt-out requests will not
                affect the running of your existing account or the services you
                request from us, in respect of which we will still process your
                personal data in accordance with this policy.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                7. Breach of Personal Data
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                In the event of a breach of security leading to the accidental
                or unlawful destruction, loss, alteration, unauthorized
                disclosure of, or access to Personal Data, we shall, within 72
                (Seventy-Two) hours of having knowledge of such breach, report
                the details of the breach to the relevant regulatory body.
              </p>

              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Furthermore, where we ascertain that such breach is detrimental
                to your rights and freedom in relation to your Personal Data, we
                shall within 7 (Seven) working days of having knowledge of the
                occurrence of such breach take steps to inform you of the breach
                incident, the risk to your rights and freedom and any course of
                action to remedy said breach.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                8. Cookies
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Most web browsers are set to accept cookies by default. If you
                prefer, you can usually choose to set your browser to remove or
                reject browser cookies. Please note that if you choose to remove
                or reject cookies, this could affect the availability and
                functionality of our Services.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                9. Who is your personal data shared with?
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                We may disclose your personal data to: Entities within our
                Group; Law enforcement bodies and/or other regulatory entities
                in order to comply with any legal obligation; Third parties who
                we use to carry out the checks that we need to carry out on you,
                such as identification verification, account verification,
                anti-money laundering checks, including financial crime
                prevention agencies and utility companies, and as specified in
                the terms of service; Other parties who help us to deliver the
                services to you who may be located in or outside the European
                Economic Area (EEA); Third parties for marketing purposes
                subject to the limitations set out in section 6; Third parties
                to run, develop and/or grow our business, when it is in our
                legitimate interests to do so; Your employer (or the employer of
                a person who you are connected to) and/or an agent designated by
                your employer, if required by law or regulation which the
                relevant employer is subject to and you have consented to such
                data sharing.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Third parties who we share your personal data with may only use
                it for the purposes set out in this policy and in accordance
                with all applicable laws. If we transfer your data outside of
                the EEA, we will always ensure that appropriate controls are in
                place to protect your data in accordance with applicable data
                protection laws.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                For details of the potential transfers of or access to your
                personal data within or outside of the EEA and the safeguards
                that we have in place when transferring, or allowing access to,
                your personal data, (and for a copy of the safeguards, where
                applicable) please contact our Data Protection Officer via email
                at EMAIL ADDRESS or using the postal address given at the end of
                this policy. Your information may also be collected and used by
                any of the parties detailed in this section.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                10. Safeguarding your personal data
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                We take all reasonable care in the collection, storage,
                processing and disclosure of your personal data and have
                implemented internal security procedures to minimize the risk
                that unauthorized parties will be able to access and misuse the
                information. It is because of these security procedures that we
                may ask for proof of identity before we disclose any personal
                information about you.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                11. Sale of the business
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                In the event that we are sold (fully or partially), integrated
                with another business or dispose of our rights and obligations
                under any agreement with you, your records may be disclosed
                under appropriate confidentiality terms to our advisers and any
                prospective purchaser&apos;s adviser, and will be passed onto
                the new owners in accordance with all applicable laws. In the
                event that we buy any business or assets, we may disclose your
                personal data to the prospective seller of such business or
                assets under appropriate confidentiality terms and in accordance
                with all applicable laws.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                12. Third Party Links
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Please bear in mind that this policy only applies to websites
                and services operated by us and not those operated by third
                parties, including those to which our websites may link. We
                suggest that you make yourself familiar with any privacy policy
                provided by such third-party websites before providing personal
                information about yourself.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                13. Your rights and contacting us
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Subject to certain exemptions, and in some cases dependent upon
                the processing activity we are undertaking, you have certain
                rights in relation to your personal information, as follows:
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                To ask us not to process your personal data for marketing
                purposes;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                To access personal information held about you and to obtain a
                copy of it (Please note: If you require information about your
                account and/or about any services we have provided to you,
                please contact our Customer Services team in the first instance.
                In most cases, we should be able to provide the information you
                require, and this will typically be quicker than submitting a
                Data Subject Access Request (DSAR));
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                To restrict or object to the processing of your personal data
                and to request its erasure under certain circumstances. Please
                note that we will not be able to erase personal data where we
                have a legal obligation to retain such data or if we need to
                hold onto such data for other legitimate purposes e.g. defending
                any potential legal claim. In most cases, this means that we
                need to retain all or some of your personal data for 6 years
                after the closure of your account with us;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                To prevent any processing of a record of personal data that is
                causing or is likely to cause unwarranted and substantial damage
                or distress to you or another individual;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                In certain circumstances, to request that the personal data
                which you have provided to us, be transmitted to another data
                controller in a structured, commonly used, and machine-readable
                format without hindrance, where technically feasible;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                To obtain a copy of personal information safeguards used for
                transfers outside your jurisdiction;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                To lodge a complaint about the way in which your personal data
                is being shared with a supervisory authority; and Where we rely
                on your consent to use your personal data, you have the right to
                withdraw that consent at any time.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                If you wish to exercise any of the above mentioned rights, we
                may ask you for additional information to confirm your identity
                and for security purposes, in particular before disclosing
                personal information to you. We reserve the right to charge a
                fee where permitted by law, for example if your request is
                manifestly unfounded or excessive.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                You can exercise your rights by contacting us using the details
                below. Subject to legal and other permissible considerations, we
                will make every reasonable effort to honour your request
                promptly or inform you if we require further information in
                order to fulfil your request.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Please note that we may not always be able to fully address your
                request, for example if it would impact the duty of
                confidentiality we owe to others, or if we are legally permitted
                to deal with the request in a different way.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                If you have any queries about this policy or our use of your
                personal data, please contact our Data Protection Officer at{" "}
                <span className="font-semibold">EMAIL ADRESS</span> or in
                writing at:
              </p>
              <p className="text-sm text-colour-five leading-[28px] font-semibold lg:text-lg lg:leading-[44px]">
                PHYSICAL ADERESS
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                If you have any queries about any of our terms of service
                documents or the website in general, do not hesitate to contact
                us at:
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Customer Services
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Royal Stone Capital
              </p>
              <p className="text-sm text-colour-five leading-[28px] font-semibold lg:text-lg lg:leading-[44px]">
                PHYSICAL ADERESS
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Tel:
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Email:
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                14. Complaints
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                If you have any concerns or complaints as to how we have handled
                your personal data you may lodge a complaint with the USA&apos;s data
                protection regulator, the FTC, who can be contacted through
                their website at <Link href="https://www.ftc.gov/about-ftc/contact" className="text-color-one duration-300 hover:text-green-700">https://www.ftc.gov/about-ftc/contact</Link>.
              </p>
            </section>
          </section>
        </div>
        <DownloadApp />
      </main>
      <Footer />
    </div>
  );
}
