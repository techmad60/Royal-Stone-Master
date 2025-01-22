//app/privacy-policy/page.tsx
import Footer from "@/components/Sections/Footer";
import Header from "@/components/Sections/Header";
import DownloadApp from "@/components/ui/DownloadApp";

export default function TermsOfService() {
  return (
    <div className={`flex flex-col`}>
      <Header />
      <main className="">
        <div className="flex flex-col px-4 mx-auto lg:max-w-[57.5rem] xl:max-w-[75.5rem] ">
          <section className="flex flex-col justify-start items-start mt-32">
            <h1
              className={`text-color-zero text-lg-base leading-none font-extrabold my-4 text-start lg:text-[39px]`}
            >
              Terms and Condition
            </h1>
            <p className="text-sm text-colour-five mb-1 leading-none lg:text-base">
            Updated Last: 1st of January, 2025.
            </p>
            <p className="text-sm text-colour-five mt-6 mb-4 lg:text-base">
              By accessing, viewing the Platform or using the Services through
              any means, you accept our terms and conditions and agree to be
              bound.
            </p>
            
          </section>
          <section className="flex flex-col justify-start items-start space-y-4 py-8 lg:space-y-20">
            {/* Introduction */}
            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                Introduction
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Royal stone Financial Technology Limited (&quot;Royal
                stone&quot;) is registered with Investment company in USA as a
                fund/portfolio manager. Royal stone provides an automated
                savings and investment platform available on its website at
                Royal stone.com and/or through its mobile applications.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                1.1 Definitions
              </h2>
              <p className="text-sm text-colour-five leading-[12px] lg:text-lg lg:leading-[44px]">
                This agreement will be effective on your acceptance of its terms
                electronically or otherwise through the platform.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                1.1.2 &quot;APIs&quot; means programmatic web application
                programming interfaces and associated tools and documentation
                that provide access to certain data displayed on the Platform.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                1.1.3 &quot;Applicable Law&quot; means, any constitution,
                statute, law, rule, regulation, ordinance, judgement, order,
                decree of the United States of America, or any published
                directive, guideline, requirement or other governmental
                restriction that has the force of law, whether in effect as of
                the date hereof or as of any date thereafter in United States of
                America.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                1.1.4 &quot;Client&quot;, &quot;Customer&quot;, &quot;you&quot;,
                &quot;your&quot; means a party using and utilising our Services
                through our Platform.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                1.1.5 &quot;Royal stone&quot;, We&quot;, &quot;us&quot;, and
                &quot;our&quot; means Royal stone capital and its successors,
                affiliates, and assignees. &quot;Royal stone Account&quot; means
                a Client or Customer&apos;s account with Royal stone for the
                Services we render.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                1.1.6 &quot;Partner Program&quot; refers to contractual
                relationships entered into between Royal stone and thirdparty
                service providers to enhance or build on Royal stone&apos;s
                product offerings.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                1.1.7 &quot;Platform&quot; means collectively, Royal
                stone&apos;s website, mobile applications, and blog and includes
                any updates or replacements as may be applicable.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                1.1.8 &quot;Services&quot; means the management of a
                Client&apos;s savings and investments made through the Platform
                and/or other services as may be agreed between the parties but
                subject always to the terms of our license.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                1.1.9 &apos;Terms of Use&apos; means these terms of use.
              </p>
            </section>

            {/* Whys? */}
            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                1.2 Purpose
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                We offer an automated savings and investment service as a
                licensed fund/portfolio manager. As our Client, we will use best
                efforts and reasonable care to manage your savings and
                investments made through our Platform on your behalf to maximize
                your returns.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                These Terms of Use set out the terms and conditions under which
                Royal stone will provide the Services to its Clients and under
                which they may access the Platform.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Please read the privacy policy carefully before accessing the
                Platform or using the Services.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                References to &quot;you&quot; or &quot;your&quot; are references
                to any person accessing or using the Platform, and/or Services
                by any means.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                1.3 Scope of Terms of Use
              </h2>

              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Subject to the provisions of clause 7 (Termination), these Terms
                of Use remain in effect until you discontinue your use of the
                Services/access to the Platform and all financial obligations
                with regard to your use of the Services have been fulfilled.
              </p>

              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Royal stone reserves the right to amend, modify or change any
                portion of the Terms of Use without prior notice to you and
                without your consent. Where any portion of the Terms of Use are
                amended or modified, such changes shall be effective
                immediately.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                We suggest that you review these Terms of Use periodically for
                such changes and/or modifications. You acknowledge that by
                accessing our Platform and using the Services after such
                change/modifications, you agree to these terms as modified.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                If you do not agree with these Terms of Use, please do not
                proceed with utilising the Platform and our Services. Please
                note that if you are an existing Client, these Terms of Use will
                apply in addition to those contained in any agreement entered
                into between Royal stone and third parties in relation to
                provision of the Services.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                2. Obligations
              </h2>
              <p className="font-bold text-colour-five lg:text-base">
                2.1 Eligibility
              </p>

              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Our services are available to individuals aged 18+ who meet our
                eligibility criteria.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Any access to the Platform or use of the Services by any person
                or entity who does not meet up with the above criteria is not
                allowed or permitted, and shall be in violation of these Terms
                of Use.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                2.2 Your Access
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                In order to access certain features of the Platform, you must
                register to create an account (&quot;Client Account&quot;). When
                you register, you will be asked to choose a password which you
                will be required to provide in order to access your Account.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Royal stone has physical, electronic, and procedural safeguards
                that comply with regulatory standards under Applicable Law to
                guard Clients&apos; personal information (see privacy policy).
                You are responsible for safeguarding your password and other
                Account information. You agree not to disclose your password to
                any third party and you will notify Royal stone immediately if
                your password is lost or stolen or if you suspect any
                unauthorised use of your Account.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                As a Client, you agree that you shall be solely responsible for
                any activities or actions under your Royalstone Account and that
                Royal stone is irrevocably authorised to comply with any
                instructions received on the Services on your behalf for your
                use of the Services. Such instructions shall be irrevocably
                deemed to have been authorised by you.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                If you do not use the Services/Platform for a certain period of
                time, Applicable Law may require us to report the funds in your
                Client Account as unclaimed property. If this occurs, we may try
                to locate you or your next of kin at the address shown in our
                records. If we are unable to locate you, we may be required to
                deliver any funds in your Client Account to the applicable state
                as unclaimed property. The specified period of time to report
                and deliver funds to a state varies by state.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                In the event of death, payments of all monies/interest in a
                Client Account shall be made in accordance with the Applicable
                Law.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                2.3 Alerts, Notifications and Service Communications
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                By creating a Client Account, you automatically sign up for
                various types of alerts via e-mail and mobile notification. We
                never include your password in these communications, but we may
                include your name, or email address and information about your
                portfolio(s) if you are a Client. Anyone with access to your
                e-mail or mobile device will be able to view these alerts. You
                may unsubscribe from marketing oriented emails at any time.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                2.4 Confidentiality
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                All information and documents obtained by Royal stone or its
                employees, consultants or agents which are not published or
                otherwise publicly available shall be kept confidential and not
                disclosed to third parties or the public. This restriction shall
                not apply to any information disclosed to legal advisers, or to
                a third party to the extent that this is deemed by Royal stone
                as required, by any court of competent jurisdiction, or by a
                governmental or regulatory authority. This covenant shall
                survive termination of these Terms of Use.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                3. Fund/Portfolio Manager services
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                The Client hereby appoints Royal stone as its fund/portfolio
                manager and grants a limited power-of-attorney with
                discretionary trading authority to manage the assets in your
                Customer Account. Royal stone accepts this appointment under the
                terms and conditions set forth.
              </p>

              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Our authority will include the ability to manage your Customer
                Account utilising your selected Royal stone investment model to:
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Buy, sell and trade stocks;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Invest in different investment packages;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Manage cash balances within your Client Account and
              </p>

              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Periodically rebalance your portfolio
              </p>

              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                You acknowledge that:
              </p>

              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Royal stone will deliver the Services exclusively through the
                Platform;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                All Client assets/investments are held with a licensed custodian
                for safekeeping in order to minimize the risk of their
                misappropriation, misuse, theft, and/or loss and in accordance
                with Applicable Law;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                In addition to the Platform, Royal stone may provide Services in
                person, over the phone, or through any other medium; and
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                With respect to Client Account where we have discretion to
                effect trades without your prior consultation or approval
                (&quot;Discretionary Accounts&quot;), you may contact Royal
                stone by email during its business hours regarding questions
                about the Platform or Services.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                You acknowledge that Royal stone does not provide:
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Financial planning services, and its Services are not a complete
                investment program; tax, accounting, investment or legal advice;
                You are encouraged to consider additional asset classes,
                strategies and investments to supplement your overall plan; and
                to consult with your tax advisor regarding any tax consequences
                related to your Royalstone Account.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                You acknowledge that neither the information, nor any opinion,
                contained on the Platform constitutes a solicitation or offer by
                Royal stone or its affiliates to buy or sell any securities.
                Decisions based on information contained on the Platform are the
                sole responsibility of the Client/Customer. The information
                contained on our Platform is for informational purposes only and
                is not intended to be relied upon as a forecast, research or
                investment advice. The information on this Platform does not
                constitute a recommendation, offer or solicitation to buy or
                sell any securities or to adopt any investment strategy.
                Although the material on our Platform is based upon information
                that Royal stone considers reliable and endeavours to keep
                current, Royal stone does not assure that this material is
                accurate, current or complete, and it should not be relied upon
                as such. Any opinions expressed on the Platform may change as
                subsequent conditions vary. Past performance is no guarantee of
                future results.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                3.1 Savings Terms and Conditions
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                By using and continuing to use and/or utilise our Services/the
                Platform, you hereby acknowledge and undertake as follows:
              </p>

              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                The lock period and interest rates of all plans in our Platform
                shall be as stated in each savings plan (as may be revised or
                amended by Royal stone from time to time) subject to Applicable
                Law and/or current market circumstances;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Royal stone may, with or without any prior notice to the Client,
                revise, change or amend the applicable lock periods and/or
                interest rates of any of the plans on the Platform. You hereby
                undertake to hold Royal stone, its directors, officers,
                employees, agents, successors or assigns harmless free from, and
                against all claims, losses, damages, liabilities, costs and
                expenses (including but not limited to reasonable legal fees)
                that may arise as a result of the provision of this clause.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                3.2 Fee and Expenses
              </h2>
              <p className="font-bold text-colour-five lg:text-base">
                Advisory Fee
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                The management fee for each strategy is based on the aggregate
                net asset value in the Client&apos;s Account.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                The annual management fee will be accrued daily and collected
                monthly or will be pro-rated (if a Client terminates his or her
                account before a month-end). Management fees will also be
                pro-rated based on additions or withdrawals to the Client&apos;s
                Royal Stone Account during the applicable billing period. If a
                Client requests a withdrawal that will result in insufficient
                assets to pay any fees that are due at the time of the
                withdrawal, fees will be collected at the time of the
                withdrawal.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five lg:text-base">
                Other Fees
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                You hereby acknowledge that you may incur certain other charges
                imposed by third-party financial institutions. These additional
                costs may include, and are not limited to bank transfer fees,
                transfer taxes etc. You understand that these fees are not
                included in the fee that you pay to Royal stone.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                Fee Payment
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                By using the Services, you authorize Royalstone to deduct any
                fees applicable to your Client Account directly from your Royal
                Stone Account (the &quot;Account Fees&quot;).
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Payment of fees generally will be made first from Client Account
                assets in cash, next from the liquidation of cash equivalents,
                and finally from liquidation of assets held in your Account.
                Until you terminate your Account, you will be deemed to reaffirm
                continuously your agreement that Royal stone may deduct the
                Account Fees from your Client Account.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                4. Disclaimer and Limit of Liability
              </h2>
              <p className="font-bold text-colour-five lg:text-base">
                4.1 For a Prospect who is not a Client
              </p>

              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                You understand and acknowledge that the investment results you
                could obtain from investment information and financial insights
                provided by Royal stone cannot be guaranteed and that Royal
                stone cannot be held responsible. All investments entail a risk
                of loss and that you may lose money. Your election to engage our
                savings and investment services are subject to your explicit
                enrolment and acceptance of these Terms of Use. You agree and
                understand that your use of Royal stone is for educational
                purposes only and is not intended to provide legal, tax or
                financial planning advice. You agree as a Client that you are
                responsible for your own investment research and investment
                decisions, that Royal stone is only one of many tools you may
                use as part of a comprehensive investment education process,
                that you should not and will not rely on Royal stone as the
                primary basis of your investment decisions and, except as
                otherwise provided for herein, Royal stone will not be liable
                for decisions/actions you take or authorise third parties to
                take on your behalf based on information you receive as a Client
                of Royal stone or information you otherwise see on our Platform.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                4.2 Non-Exclusive Services
              </h2>

              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                You understand and agree that we provide the Services for other
                Clients. You further understand that we and our affiliates may
                take investment action on behalf of such other Clients, that
                differ from investment action taken on behalf of your account.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                4.3 Investment Risks
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                While we provide indicative interest rates/returns with respect
                to certain plans on our Platform, you recognize that there may
                be loss or depreciation of the value of any investment and the
                assets due to the fluctuation of market values, and accordingly
                the value of assets/interest rates (as applicable) in your
                Royalstone Account may or decrease based on prevailing market
                circumstances. You represent that we have not made any
                guarantee, either oral or written, that your investment
                objective will be achieved or that the value of any Client
                Account assets will not decline.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                4.4 Disclaimer Warranties
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Your use of Royalstone&apos;s Platform, and the personal
                information you provide is at your sole discretion. Royal
                stone&apos;s Platform and all materials, information, products
                and services included therein, are provided on an AS IS and AS
                AVAILABLE basis without warranties of any kind from Royal stone.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                ROYAL STONE EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND,
                EXPRESS, IMPLIED OR STATUTORY, RELATING TO ROYAL STONE&apos;S
                PLATFORM AND/OR SERVICES, CONTENT AND/OR CLIENT INFORMATION,
                INCLUDING WITHOUT LIMITATION TO THE WARRANTIES OF TITLE,
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                NON-INFRINGEMENT OF PROPRIETARY RIGHTS, COURSE OF DEALING OR
                COURSE OF PERFORMANCE. ROYAL STONE DISCLAIMS ANY WARRANTIES,
                EXPRESS OR IMPLIED:
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                REGARDING THE AVAILABILITY, SECURITY, ACCURACY, RELIABILITY,
                TIMELINESS AND PERFORMANCE OF ROYAL STONE&apos;S PLATFORM,
                SERVICES CONTENT AND/OR CLIENT INFORMATION;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                REGARDING ACTIONS/INACTIONS BY THIRD PARTIES;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                THAT ROYAL STONE&apos;S PLATFORM WILL BE ERROR-FREE OR THAT ANY
                ERRORS WILL BE CORRECTED;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                THAT ROYAL STONE&apos;S PLATFORM WILL BE FREE FROM ELECTRONIC
                VIRUSES; OR
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                REGARDING THE PERFORMANCE OF OR ACCURACY, QUALITY, CURRENCY,
                COMPLETENESS OR USEFULNESS OF ANY INFORMATION PROVIDED BY ROYAL
                STONE ON ITS PLATFORM INCLUDING BUT NOT LIMITED TO INFORMATION
                OBTAINED THROUGH SOCIAL MEDIA.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                No advice or information, whether oral or written, obtained by
                you from Royalstone&apos;s Platform, shall create any warranty
                not expressly stated in these Terms of Use. If you choose to
                rely on such information, you do so solely at your own risk
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                4.5 Indemnity
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                You hereby undertake to defend, indemnify and hold harmless the
                Royal stone, its directors, officers, employees, agents,
                successors or assigns from and against any and all claims,
                losses, damages, liabilities, costs and expenses (including but
                not limited to reasonable legal fees) while acting in accordance
                with the terms of these Terms of Use and that are not a direct
                result of a breach of the terms herein state, bad faith, gross
                negligence, and material violation of Applicable Law.
              </p>
              <p>
                Royal stone shall not be liable for any loss affecting the
                assets held by it on behalf of the Client, where such losses are
                the result of unforeseen adverse market conditions, government
                restrictions, exchange or market rulings or suspension of
                trading.
              </p>
              <p>
                Royal stone shall not be liable for any act or failure to act by
                any third party.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                4.6 Limitation of Liability
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                IN NO EVENT SHALL ROYAL STONE OR ANY OF ITS OFFICERS, DIRECTORS,
                EMPLOYEES, OR AGENTS BE LIABLE TO YOU FOR ANY DAMAGES
                WHATSOEVER, INCLUDING WITHOUT LIMITATION INDIRECT, INCIDENTAL,
                SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, ARISING OUT OF OR
                IN CONNECTION WITH YOUR USE OF ROYALSTONE, CONTENT AND/OR CLIENT
                INFORMATION, INCLUDING BUT NOT LIMITED TO THE QUALITY, ACCURACY,
                OR UTILITY OF THE INFORMATION PROVIDED AS PART OF OR THROUGH
                ROYALSTONE OR FOR ANY INVESTMENT DECISIONS MADE ON THE BASIS OF
                SUCH INFORMATION, WHETHER THE DAMAGES ARE FORESEEABLE AND
                WHETHER OR NOT ROYAL STONE HAS BEEN ADVISED OF THE POSSIBILITY
                OF SUCH DAMAGES. THE FOREGOING LIMITATION OF LIABILITY SHALL
                APPLY TO THE FULLEST EXTENT PERMITTED BY LAW IN THE APPLICABLE
                JURISDICTION AND IN NO EVENT SHALL ROYAL STONE&apos;S CUMULATIVE
                LIABILITY TO YOU EXCEED $1,000.00 OR ITS EQUIVALENT IN ANY
                CURRENCY.
              </p>
            </section>
            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                4.7 Feedback Release
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                We may from time to time reach out to Clients to provide
                feedback/testimonials in respect of our Services and/or the
                Platform. This would usually involve the use of your images,
                biographical information, recordings, video/audio clips (the
                &quot;Material&quot;). You acknowledge that the Material may be
                used in diverse settings within an unrestricted geographic area.
                You hereby release Royal stone, its representatives, employees,
                managers, members, officers, parent companies, subsidiaries, and
                directors, from all claims and demands arising out of or in
                connection with any use of the Material, including, without
                limitation, all claims for invasion of privacy, infringement of
                your right of publicity, defamation and any other personal
                and/or property rights. Additionally, you waive any right to
                royalties or other compensation arising or related to the use of
                the Material.
              </p>
            </section>
            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                5. Anti-Money Laundering
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                You represent and warrant the following and shall promptly
                notify Royal stone if any of the following ceases to be true and
                accurate:
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                To the best of your knowledge (having made due and careful
                enquiries), none of the cash or assets that will be managed by
                Royalstone has been or shall be derived from or related to any
                activity that is deemed to be in contravention or breach of
                Applicable Law;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                No contribution or payment by you to Royalstone shall cause
                Royalstone to be in violation of Applicable Law.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Where we discover that the representations above are untrue or
                inaccurate or that our Platform and or Services are being used
                contrary to Applicable Law or for any suspicious transactions;
                as determined by us, you undertake to indemnify us against any
                loss, damages or expenses that we may incur as a result of it
                and further acknowledge that we have an obligation to report
                your activities to the relevant authorities without recourse to
                you.
              </p>
            </section>
            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                6. Representations and Warranties
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                6.1 You represent and warrant that:
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                You have full power, capacity, and authority to access the
                Platform/use the Services;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                The terms hereof do not violate any obligation by which you are
                bound, whether arising by contract or operation of law, or
                otherwise;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                The assets in the Client&apos;s Accounts are free from all liens
                and charges; and
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                You shall promptly notify Royal stone if any of your
                representations or warranties in this Agreement are no longer
                true or completely accurate.
              </p>
            </section>
            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                7. Termination
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                We may terminate or suspend your use of the Services, at any
                time without prior notice to you if your Royalstone Account is
                found to be fraudulent, in the case of bankruptcy/insolvency (as
                may be applicable), if required (acting reasonably) or, if you
                have breached any part of these Terms of Use.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                We will fully cooperate with any law enforcement authorities or
                court order requesting or directing us to disclose the identity
                of anyone posting, publishing, or otherwise making available any
                Client&apos;s information, emails, or other materials that are
                believed to violate these Terms of Use. Any suspension,
                termination, or cancellation shall not affect your obligations
                to Royal stone under these Terms of Use (including but not
                limited to ownership, indemnification, and limitation of
                liability), which by their sense and context are intended to
                survive such suspension, termination, or cancellation.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                You may terminate your relationship with us at any time subject
                to specific rules/guidelines applicable to your Royalstone
                Account. Termination is without prejudice to rights and
                obligations arising prior to the date of termination.
              </p>
            </section>
            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                8. Royal stone &quot;Dos&quot; and &quot;Don&apos;ts&quot;
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Royal stone grants you a limited and non-exclusive license to
                use our Platform so long as you comply with all our rules.
              </p>
            </section>
            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                8.1 Dos: You agree you will:
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Comply with Applicable Law;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Provide accurate and updated information to us, whether reported
                directly or through a third party who you authorise;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Use the Services solely for your personal, non-commercial use;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Use your real name on your profile and keep your password
                confidential;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Use the Services in a professional manner.
              </p>
            </section>
            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                8.2 Donts: You agree you won&apos;t:
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Circumvent, disable, or otherwise interfere with
                security-related features of the Platform or features that
                prevent or restrict use or copying of any content or Client
                information;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Upload, email, transmit, provide, or otherwise make available:
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Any Client information which you do not have the lawful right to
                use, copy, transmit, display, or make available (including any
                Client information that would violate any confidentiality or
                fiduciary obligations that you might have with respect to the
                Client information); or
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Any Client information that infringes the intellectual property
                rights of, or violates the privacy rights of, any third-party
                (including without limitation copyright, trademark, patent,
                trade secret, or other intellectual property right, moral right,
                or right of publicity); or
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Unsolicited or unauthorised advertising, promotional materials,
                junk mail, spam, chain letters, pyramid schemes, or any other
                form of solicitation; or
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Any personal information that is unlawful, obscene, harmful,
                threatening, harassing, defamatory, or hateful, or that contain
                objects or symbols of hate, invade the privacy of any
                third-party, contain nudity, are deceptive, threatening,
                abusive, inciting of unlawful action, or are otherwise
                objectionable in the sole discretion of Royal stone; or
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Any personal information that contains software viruses or any
                other computer code, files, or programs designed to (i)
                interrupt, destroy, or limit the functionality of any computer
                software; or (ii) interfere with the access of any Client, host
                or network, including without limitation overloading, flooding,
                spamming, mail-bombing, or sending a virus to Royal stone; or
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Any personal information that includes code that is hidden or
                otherwise surreptitiously contained within the Client
                information;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Use any meta tags or other hidden text or metadata utilising a
                Royal stone name, trademark, URL or product name;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Forge any TCP/IP packet header or any part of the header
                information in any posting, or in any way use Royal stone to
                send altered, deceptive, or false source- identifying
                information;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Interfere with or disrupt (or attempt to interfere with or
                disrupt) any Royal stone web page, server, or network, or the
                technical delivery systems of Royal stone&apos;s providers, or
                disobey any requirements, procedures, policies, or regulations
                of networks connected to Royal stone.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Attempt to probe, scan, or test the vulnerability of any Royal
                stone system or network or breach or impair or circumvent any
                security or authentication measures protecting Royal stone;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Attempt to decipher, decompile, disassemble, or reverse-engineer
                any of the software used to provide Royal stone;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Attempt to access, search, or meta-search Royal stone or content
                thereon with any engine, software, tool, agent, device, or
                mechanism other than software and/or search agents provided by
                Royal stone or other generally available third- party web
                browsers, including without limitation any software that sends
                queries to Royal stone to determine how a website or web page
                ranks;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Violate the Terms of Use or any other rule or agreement
                applicable to you or Royal stone&apos;s inclusion in, reference
                to, or relationship with any third party or third-party site or
                service, or your use of any such third-party site or service;
                Collect or store personal information about other clients
                without their express permission;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Impersonate or misrepresent your affiliation with any person or
                entity, through pretexting or some other form of social
                engineering, or commit fraud;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Solicit any Client for any investment or other commercial or
                promotional transaction;
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Scrape or copy information through any means (including
                crawlers, browser plugins and add-ons, and any other technology
                or manual work);
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Use, launch, or permit to be used any automated system,
                including without limitation &quot;robots,&quot;
                &quot;crawlers,&quot; or &quot;spiders&quot;; or
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Copy or use the information, content or data on Royal stone in
                connection with a competitive service (as determined by Royal
                stone);
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Monitor Royal stone&apos;s availability, performance or
                functionality for any competitive purposes.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Use Royal stone or content thereon in any manner not permitted
                by these Terms of Use.
              </p>
            </section>
            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                9. Copyright and Other Intellectual Property
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                The content contained on this Platform is owned or licensed by
                Royal stone and its third-party information providers and is
                protected by applicable copyrights, trademarks, service marks,
                and/or other intellectual property rights. Such content is
                solely for your personal, non-commercial use. Accordingly, in
                addition to specific restrictions outlined under clause 8.2, you
                may not copy, distribute, modify, post, frame or deep link this
                Platform, including any text, graphics, video, audio, software
                code, user interface design or logos.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                You may download material displayed on the Platform for your
                personal use provided you also retain all copyright and other
                proprietary notices contained on the materials. You may not
                distribute, modify, transmit, reuse, repost, or use the content
                on the Platform for public or commercial purposes, including all
                text, images, audio, and video. Modification or use of the
                materials for any other purpose violates Royal stone&apos;s
                intellectual property rights.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                All trademarks, service marks, trade names, and logos displayed
                on the Platform are proprietary to Royal stone and/or their
                respective owners. Nothing contained on the Platform should be
                construed as granting, by implication, estoppel, or otherwise,
                any license or right to use any trademark displayed on the
                Platform without the written permission of Royal stone or such
                other third party that may own the trademark displayed on the
                Platform. Your use of the trademarks displayed on the Platform,
                except as provided herein, is strictly prohibited.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                The use of the images displayed on the Platform by you, or
                anyone else authorised by you, is prohibited. Any unauthorised
                use of the images may violate copyright laws, trademark laws,
                and the laws of privacy and publicity, and communications, as
                well as other regulations and statutes. If you download any
                information from the Platform, you agree that you will not copy
                it or remove or obscure any copyright or other notices or
                legends contained in any such information.
              </p>
            </section>
            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                10. General Terms
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                In the event that any provision in these Terms of Use is held to
                be invalid or unenforceable, the remaining provisions will
                remain in full force and effect. The failure of a party to
                enforce any right or provision of these Terms of Use will not be
                deemed a waiver of such right or provision. You may not assign
                your rights or novate or delegate your obligations under these
                Terms of Use (by operation of law or otherwise) without the
                prior written consent of Royal stone, and any prohibited
                assignment will be null and void.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Royal stone may assign these Terms of Use or any rights
                hereunder without your consent. The relationship of the parties
                under these Terms of Use is that of independent contractors, and
                these Terms of Use will not be construed to imply that either
                party is the agent, employee, or joint venture of the other.
                Note that if you elect to become a Client, the relationship of
                the parties will be governed by these Terms of Use and any
                additional terms to which you agree when you create and fund an
                investment account.
              </p>
            </section>
            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                11. Miscellaneous
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                These Terms of Use, together with all guidance notes in respect
                of Client Accounts as set out on the Platform and any Client
                agreement (if applicable) form the complete and exclusive
                agreement between you and Royal stone with respect to your use
                of our Platform and Services superseding and replacing any, and
                all prior or contemporaneous agreements, communications, and
                understandings, both oral and written, regarding the subject
                matter.
              </p>
            </section>
            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                11.1 Governing Law and Dispute Resolution
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                These Terms of Use shall be governed, construed, and enforced
                pursuant to the laws of the United States America.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Any disagreement, dispute or difference howsoever arising, from
                these Terms of Use including its interpretation and validity or
                as to the rights, duties and liabilities of the parties hereto
                or as to any other matter in any way connected with or arising
                out of or in relation to the subject matter of these Terms of
                Use, which cannot be amicably resolved by the parties within 30
                (thirty) days shall be referred to arbitration in accordance
                with and subject to the provisions of the Arbitration and
                Conciliation Act, Laws of the United States of America.
              </p>
            </section>
            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                11.2 Governing Law and Dispute Resolution
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                If any provision of these Terms of Use is found to be illegal,
                unenforceable or invalid, that provision will be limited or
                eliminated to the minimum extent necessary so that these Terms
                of Use will otherwise remain in full force and effect.
              </p>
            </section>
            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                11.3 Waivers
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                The failure of either party to exercise in any respect any right
                provided for herein shall not be deemed a waiver of any further
                rights hereunder.
              </p>
            </section>
            <section className="space-y-5">
              <h2 className="font-bold text-colour-five leading-none lg:text-base">
                11.4 Communication: Any notice or communication will be in
                writing by email
              </h2>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                By accepting to use the Services and access the Platform you
                further agree and acknowledge that these Terms of Use and the
                rules, restrictions, and policies contained herein, and Royal
                stone&apos;s enforcement thereof, are not intended to confer and do
                not confer any rights or remedies on any person other than you
                and Royal stone.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                You hereby authorize the delivery of notices by (a) Royal stone
                via email (in each case to the address that you provide), or (b)
                you, via email to hello@Royalstone.com or to such other
                addresses as Royal stone may specify. The date of receipt shall
                be deemed the date on which such notice is transmitted.
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                You can also contact Royal stone by phone at +1 (0) 96758888
                ROYAL STONE or via physical mail at:
              </p>
              <p className="text-sm text-colour-five leading-[28px] lg:text-lg lg:leading-[44px]">
                Royal stone.{" "}
                <span className="font-bold">PHYSICAL ADDRESS.</span>
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
