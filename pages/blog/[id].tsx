import {GetStaticPaths, GetStaticProps} from "next/types";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {BlogPost, GetStaticPath} from "types";
import {getAllPostIds, getPostData} from 'utils/blogParse'
import revalidate from 'utils/revalidate'

import Layout from "components/Layout";

type Props = {
    postData: BlogPost
}

export default function Post({postData}: Props) {
    return (
        <Layout
            title={postData.title}
            description={postData.description}
        >
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml as string}}/>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async ({locales = []}) => {
    const initPaths = getAllPostIds()
    const paths: GetStaticPath[] = initPaths.flatMap(initPath =>
        locales.map(locale => ({
            params: {id: initPath.params.id.toString()},
            locale,
        })))
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params, locale}) => {
    const postData = await getPostData(params?.id as string);

    return {
        props: {
            postData,
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
        revalidate:revalidate
    };
}
