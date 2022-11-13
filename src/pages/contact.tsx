import axios from "axios";
import {NextPage} from "next";
import Head from "next/head";
import Link from "next/link";
import {useState} from "react";
import {useForm} from "react-hook-form";

import {Button,} from "~/components";
import {site} from "~/config";
import {PageLayout} from "~/layout";
import {
  ContentManager,
  PageProps,
  StaticPage,
  StaticPageMeta,
} from "~/modules/content-manager";

export enum FeedbackState {
  NOT_SENT,
  SENT,
  ERROR,
}

export type FormValues = {
  msg: string,
  email: string,
}

export const submit = async (
  values: FormValues,
  setFeedbackState: (state: FeedbackState) => void,
  reset: () =>void
) => {
  const config = {
    method: "post",
    url:`${process.env["BACKEND_URL"]}hook/feedback/`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: new URLSearchParams(values),
  };

  try {
    await axios(config);
    setFeedbackState(FeedbackState.SENT);
    reset();
  } catch (error) {
    setFeedbackState(FeedbackState.ERROR);
  }
};

interface ContactProperties extends StaticPageMeta {
  subTitle: string,
  iban: string,
  company: string,
  phone: string,
  street: string,
  zipCode: string,
  city: string,
  country: string,
  regNumber: string,
}

const Contact: NextPage<PageProps<StaticPage<ContactProperties>>> = ({menu, social, data}) => {
  const {meta, content} = data;
  const {register, handleSubmit, reset} = useForm<FormValues>();
  const [feedbackState, setFeedbackState] = useState(FeedbackState.NOT_SENT);

  const getFeedbackStateMessage = (state: FeedbackState) => {
    switch (state) {
    case FeedbackState.NOT_SENT:
      return null;
    case FeedbackState.ERROR:
      return (
        <div className="bg-red-alert border-red-border p-8 text-dark-super font-bold border-t-2">
           Something went wrong
        </div>
      );
    case FeedbackState.SENT:
      return (
        <div className="bg-green-alert p-8 text-dark-super font-bold border-t-2 border-green-border">
           Thank you for your message!
        </div>
      );
    }
  };

  const title = `${meta.title} - ${site.name}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <PageLayout
        className="flex flex-col relative"
        page={meta}
        links={menu}
        social={social}
      >
        <div className="flex flex-col md:flex-row w-full text-md">
          <div className="flex flex-col md:w-1/2">
            <div className="flex flex-col p-48 relative text-white min-h-min bg-dark space-y-32">
              <div className="flex flex-col space-y-48">
                <div className="org text-2xl">{meta.company}</div>
                <div className="flex flex-col space-y-24">
                  <div className="adr">
                    <div className="uppercase text-grey-600 text-sm">Address</div>
                    <span className="street-address">
                      {meta.street}
                    </span>
                    <br />
                    <span className="postal-code">
                      {meta.zipCode}
                    </span>{" "}
                    <span className="locality">
                      {meta.city}
                    </span>
                    <br />
                    <span className="country-name">
                      {meta.country}
                    </span>
                  </div>
                  <div>
                    <div className="uppercase text-grey-600 text-sm">Phone</div>
                    <a
                      href={`tel:${meta.phone}`}
                      className="border-b-2 border-dotted border-white hover:text-white"
                    >
                      {meta.phone}
                    </a>
                  </div>
                  <div className="org-id">
                    <div className="uppercase text-grey-600 text-sm">Company ID</div>
                    <div className="value">{meta.regNumber}</div>
                  </div>
                  <div className="org-iban">
                    <div className="uppercase text-grey-600 text-sm">IBAN</div>
                    <div className="value text-sm sm:text-md">{meta.iban}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-dark h-32 w-32 -mt-16 mx-auto rotate-45 z-30"></div>
            <div className="-mt-16 h-288">
              <iframe
                width="100%"
                height="100%"
                id="gmap_canvas"
                src={
                  `https://maps.google.com/maps?q=${meta.street}&t=&z=17&ie=UTF8&iwloc=&output=embed`
                }
                frameBorder={0}
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
              ></iframe>
            </div>
          </div>
          <div className="feedback p-24 md:p-48 md:w-1/2 space-y-8">
            {getFeedbackStateMessage(feedbackState)}
            <form
              method="post"
              id="feedback__form"
              onSubmit={handleSubmit(values =>
                submit(values, setFeedbackState, reset),
              )}
            >
              <div className="flex flex-col space-y-24">
                <div>{content}</div>

                <div className="flex flex-col space-y-8">
                  <label htmlFor="feedback__msg" className="uppercase">
                        Your Message
                  </label>
                  <textarea
                    id="feedback__msg"
                    className="h-288 w-full bg-grey-300 rounded-2xl p-8"
                    {...register("msg")}
                    placeholder="Type your message..."
                    required
                  ></textarea>
                </div>

                <div className="flex flex-col space-y-8">
                  <label htmlFor="feedback__email" className="uppercase">
                        Your E-Mail
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    id="feedback__email"
                    defaultValue=""
                    className="p-8 w-full bg-grey-300 rounded-2xl"
                    placeholder="Type your email..."
                  />
                </div>

                <div className="py-8">
                By submitting this form you agree with{" "}
                  <Link href="/privacy-statement/">
                    <a>Privacy Statement</a>
                  </Link>
                  {" "}and accept{" "}
                  <Link
                    href="/terms-of-use/"
                    className="text-blue hover:text-dark duration-500"
                  >
                    <a>Terms of Use</a>
                  </Link>
                </div>

                <div className="flex justify-center">
                  <Button variant="primary">Send</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export const getStaticProps = async () => {
  const manager = new ContentManager();
  return {
    props: manager.getPageProps({
      ...manager.getStaticPage(site.contact.slug),
    }),
  };
};

export default Contact;
