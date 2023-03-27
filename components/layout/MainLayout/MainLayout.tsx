"use client"

import Footer from "components/Footer"
import MainHeader from "components/layout/MainHeader"
import Meta from "components/layout/Meta"
import PreviewBanner from "components/PreviewBanner/PreviewBanner"
import { useSettings } from "context/SettingsContext"
import { Page } from "lib/sanity.queries"

import s from "./MainLayout.module.scss"

export default function MainLayout({
  preview,
  loading,
  page,
  children,
}: {
  preview?: boolean
  loading?: boolean
  page?: Page
  children: React.ReactNode
}) {
  const settings = useSettings()

  return (
    <>
      <Meta settings={settings} page={page} />

      <div className={s.wrapper}>
        <PreviewBanner preview={preview} loading={loading} />
        <MainHeader />
        <main style={{ margin: "120px 0" }}>{children}</main>
        <Footer />
      </div>
    </>
  )
}
