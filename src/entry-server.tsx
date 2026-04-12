import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders } from "@/app/AppProviders";
import { AppRoutes } from "@/app/AppRoutes";
import {
  PRERENDER_ROUTES,
  getRobotsTxt,
  getSitemapXml,
  getWebManifest,
  renderHeadTags,
  resolvePage,
} from "@/seo/config";

export { PRERENDER_ROUTES, getRobotsTxt, getSitemapXml, getWebManifest };

export const render = (url: string) => {
  const page = resolvePage(url);
  const appHtml = renderToString(
    <AppProviders>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>,
  );

  return {
    appHtml,
    headTags: renderHeadTags(page),
    htmlLang: page.htmlLang,
  };
};
