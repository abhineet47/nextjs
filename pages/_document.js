import Document, { Head, Main, NextScript } from 'next/document'

const APP_NAME = 'Theincircle'
const APP_DESCRIPTION = 'This is an example'

export default class extends Document {

    urlTracker = "https://www.googletagmanager.com/gtag/js?id=AW-789373352";
  render() {
    return (
      <html lang='en' dir='ltr'>
        <Head>
          {/*<meta name='application-name' content={APP_NAME} />
           <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={APP_NAME} />
          <meta name='description' content={APP_DESCRIPTION} /> 
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#FFFFFF' />*/}
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />
          
          <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
          <link rel='manifest' href='/manifest.json' />
          <style>{
            `
            html, body, #__next {
              height: 100%;
            }
            #__next {
              margin: 0 auto;
            }
            h1 {
              text-align: center;
            }
            `
          }</style>




<script type="application/ld+json" dangerouslySetInnerHTML ={{__html: `
	{
	  "@context": "http://schema.org",
	  "@type": "Organization",
	  "name": "TheIncircle",
          "url": "https://www.theincircle.com",
	  "logo": "https://www.theincircle.com/assets/img/logo.svg",
	  "sameAs": [
		"https://www.facebook.com/TheIncircle",
		"https://twitter.com/theincircle",
		"https://www.linkedin.com/company/the-incircle",
		"https://www.instagram.com/theincircle",
		"https://www.crunchbase.com/organization/theincircle-com"
		  ]
	  }	
`}}/>

{/* Global site tag (gtag.js) - Google Analytics */}
<script async src={this.urlTracker} defer></script>
   <script async dangerouslySetInnerHTML ={{__html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-56539788-1');
  gtag('config', 'AW-789373352');
  `}}/>

{/* Google Tag Manager */}


        </Head>
        <body>
          <Main />
          <NextScript />
		  <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/9043300.js"></script>
        </body>
      </html>
    )
  }
}