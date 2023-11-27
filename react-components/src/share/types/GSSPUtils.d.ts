import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import {
  InferGetServerSidePropsType,
  GetServerSideProps,
  InferGetStaticPropsType,
  GetStaticProps,
  PreviewData,
} from 'next';

export type GSSPContext = GetServerSidePropsContext<
  NextParsedUrlQuery,
  PreviewData
>;
export type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  InferGetStaticPropsType,
  GetStaticProps,
};
