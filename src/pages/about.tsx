import {NextPage} from "next";
import Head from "next/head";
import Image from "next/image";

import {Grid, Markdown, PageAction} from "~/components";
import {Card} from "~/components/card";
import {site} from "~/config";
import {PageLayout} from "~/layout";
import {
  ContentManager,
  PageProps,
  StaticPage,
  StaticPageMeta,
} from "~/modules/content-manager";

interface TeamPersonMeta extends StaticPageMeta {
  name: string,
  photo: string,
}

interface ProjectMeta extends StaticPageMeta {
  logo: string,
}

interface AboutPageProps {
  page: StaticPage<StaticPageMeta>,
  projects: StaticPage<ProjectMeta>[],
  team: StaticPage<TeamPersonMeta>[],
  howWeWork: StaticPage<StaticPageMeta>,
}

const About: NextPage<PageProps<AboutPageProps>> = ({menu, social, data}) => {
  const {page, projects, team, howWeWork} = data;
  const title = `${page.meta.title} - ${site.name}`;

  return (
    <>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <PageLayout
        className="flex flex-col relative min-h-full"
        page={page.meta}
        links={menu}
        social={social}
      >
        <main className="flex flex-col">
          <Markdown className="text-md max-w-screen-lg mx-auto p-24 lg:p-0" content={page.content} />
          <div className="h-144 flex justify-center items-center">
            <h2 className="text-lg">Projects</h2>
          </div>
          <Grid>
            {projects.map(project => (
              <Card key={project.meta.slug} className="text-sm items-center shadow-sm space-y-24 p-48">
                <div className="flex bg-white w-144 h-144 items-center justify-center rounded-full">
                  <Image
                    src={`//projects/${project.meta.logo}`}
                    alt={project.meta.title}
                    width={144}
                    height={144}
                  />
                </div>
                <h3 className="text-lg">{project.meta.title}</h3>
                <Markdown content={project.content} />
              </Card>
            ))}
          </Grid>
          <div className="h-144 flex justify-center items-center">
            <h2 className="text-lg">Team</h2>
          </div>
          <Grid>
            {team.map(person => (
              <Card key={person.meta.slug} className="text-sm items-center shadow-sm space-y-24 p-48 mt-144">
                <div className="flex bg-white w-288 h-288 -mt-144 items-center justify-center rounded-full">
                  <Image
                    className="grayscale hover:grayscale-0 duration-500 rounded-full"
                    src={`//team/${person.meta.photo}`}
                    alt={person.meta.name}
                    width={288}
                    height={288}
                  />
                </div>
                <h3 className="text-lg">{person.meta.name}</h3>
                <p>{person.meta.title}</p>
                <Markdown content={person.content} className="w-full text-sm" />
              </Card>
            ))}
          </Grid>
          <Markdown content={howWeWork.content} className="text-md max-w-screen-lg mx-auto p-24 lg:p-0" />
          <PageAction action="Book now!" link="https://lowenware.youcanbook.me/">
            Intrested? Lets arrange a free meeting!
          </PageAction>
        </main>
      </PageLayout>
    </>
  );
};

export const getStaticProps = async () => {
  const manager = new ContentManager();
  return {
    props: manager.getPageProps({
      page: manager.getStaticPage(site.about.slug),
      projects: manager.readFolderOrdered(["about", "projects"]),
      team: manager.readFolderOrdered(["about", "team"]),
      howWeWork: manager.getStaticPage("about/how-we-work"),
    }),
  };
};

export default About;
