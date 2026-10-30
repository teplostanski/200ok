// Imported Description sections from HTTP Cats, excluding See Also.
// See docs/public/status-description-licenses.txt for attribution and licenses.
// 306 and 505 retain original summaries because HTTP Cats has no pages for them.
export const statusCodes = [
  {
    code: 100,
    title: "Continue",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/100",
    descriptionHtml:
      "<p>The HTTP <code>100 Continue</code> informational status response code\nindicates that everything so far is OK and that the client should continue with the\nrequest or ignore it if it is already finished.</p>\n<p>To have a server check the request&#x27;s headers, a client must send\n<code>Expect: 100-continue</code> as a header in its initial request\nand receive a <code>100 Continue</code> status code in response before sending the body.</p>",
    via: "https://http.cat/status/100",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 101,
    title: "Switching Protocols",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/101",
    descriptionHtml:
      '<p>The HTTP <code>101 Switching Protocols</code> response code indicates\na protocol to which the server switches.\nThe protocol is specified in the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade">Upgrade</a> request header received from a client.</p>\n<p>The server includes in this response an <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade">Upgrade</a> response header to\nindicate the protocol it switched to.</p>\n<p>The process is described in the following article:\n<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Protocol_upgrade_mechanism">Protocol upgrade mechanism</a></p>',
    via: "https://http.cat/status/101",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 102,
    title: "Processing",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status#102_processing",
    descriptionHtml:
      "<aside><strong>Deprecated:</strong>This status code is deprecated. When used, clients may still accept it, but simply ignore them.</aside>\n<p>The HTTP <code>102 Processing</code> informational status response code indicates to client that a full request has been received and the server is working on it.</p>\n<p>This status code is only sent if the server expects the request to take significant time. It tells the client that your request is not dead yet.</p>",
    via: "https://http.cat/status/102",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 103,
    title: "Early Hints",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/103",
    descriptionHtml:
      '<aside><strong>Experimental:</strong> This is an experimental technology. Check the Browser compatibility table carefully before using this in production.</aside>\n<p>The HTTP <code>103 Early Hints</code> <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#information_responses">information response</a> may be sent by a server while it is still preparing a response, with hints about the resources that the server is expecting the final response will link.</p>\n<p>This allows a browser to start <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload">preloading</a> resources even before the server has prepared and sent that final response.</p>\n<p>The early hint response is primarily intended for use with the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link">Link</a> header, which indicates the resources to be loaded.</p>\n<p>It may also contain a <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP">Content-Security-Policy</a> header that is enforced while processing the early hint.</p>\n<p>A server might send multiple <code>103</code> responses, for example, following a redirect.\nBrowsers only process the first early hint response, and this response must be discarded if the request results in a cross-origin redirect.\nPreloaded resources from the early hint are effectively pre-pended to the <code>Document</code>&#x27;s head element, and then followed by the resources loaded in the final response.</p>',
    via: "https://http.cat/status/103",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 200,
    title: "OK",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/200",
    descriptionHtml:
      "<p>The HTTP <code>200 OK</code> success status response code indicates that the request has succeeded. A 200 response is cacheable by default.</p>\n<p>The meaning of a success depends on the HTTP request method:</p>\n<ul>\n<li><code>GET</code>: The resource has been fetched and is transmitted in the message body.</li>\n<li><code>HEAD</code>: The representation headers are included in the response without any message body</li>\n<li><code>POST</code>: The resource describing the result of the action is transmitted in the message body</li>\n<li><code>TRACE</code>: The message body contains the request message as received by the server.</li>\n</ul>\n<p>The successful result of a <code>PUT</code> or a <code>DELETE</code> is often not a <code>200 OK</code> but a <code>204 No Content</code> (or a <code>201 Created</code> when the resource is uploaded for the first time).</p>",
    via: "https://http.cat/status/200",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 201,
    title: "Created",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/201",
    descriptionHtml:
      "<p>The HTTP <code>201 Created</code> success status response code indicates that the request has\nsucceeded and has led to the creation of a resource.</p>\n<p>The new resource, or a description\nand link to the new resource, is effectively created before the response is sent back\nand the newly created items are returned in the body of the message, located at either\nthe URL of the request, or at the URL in the value of the <code>Location</code> header.</p>\n<p>The common use case of this status code is as the result of a <code>POST</code>\nrequest.</p>",
    via: "https://http.cat/status/201",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 202,
    title: "Accepted",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/202",
    descriptionHtml:
      "<p>The HTTP <code>202 Accepted</code>\nresponse status code indicates that the request has been accepted for processing, but\nthe processing has not been completed; in fact, processing may not have started yet.</p>\n<p>The request might or might not eventually be acted upon, as it might be disallowed when\nprocessing actually takes place.</p>\n<p><code>202</code> is non-committal, meaning that there is no way for the HTTP to later send an\nasynchronous response indicating the outcome of processing the request. It is intended\nfor cases where another process or server handles the request, or for batch processing.</p>",
    via: "https://http.cat/status/202",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 203,
    title: "Non-Authoritative Information",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/203",
    descriptionHtml:
      "<p>The HTTP <code>203 Non-Authoritative Information</code> response\nstatus indicates that the request was successful but the enclosed payload has been\nmodified by a transforming proxy from that of the origin\nserver&#x27;s <code>200 OK</code> response.</p>\n<p>The <code>203</code> response is similar to the value <code>214</code>,\nmeaning <code>Transformation Applied</code>, of the <code>Warning</code> header\ncode, which has the additional advantage of being applicable to responses with any\nstatus code.</p>",
    via: "https://http.cat/status/203",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 204,
    title: "No Content",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/204",
    descriptionHtml:
      "<p>The HTTP <code>204 No Content</code> success status response code\nindicates that a request has succeeded, but that the client doesn&#x27;t need to navigate away\nfrom its current page.</p>\n<p>This might be used, for example, when implementing &quot;save and continue editing&quot; functionality for a wiki site.\nIn this case a <code>PUT</code> request would be used to save the page, and the <code>204 No Content</code> response\nwould be sent to indicate that the editor should not be replaced by some other page.</p>\n<p>A <code>204</code> response is cacheable by default (an <code>ETag</code> header is included in such a response).</p>",
    via: "https://http.cat/status/204",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 205,
    title: "Reset Content",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/205",
    descriptionHtml:
      "<p>The HTTP <code>205 Reset Content</code> response status tells the client to reset the document view (ie. clear the content of a form, reset canvas state or the UI).</p>",
    via: "https://http.cat/status/205",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 206,
    title: "Partial Content",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/206",
    descriptionHtml:
      "<p>The HTTP <code>206 Partial Content</code> success status response code\nindicates that the request has succeeded and the body contains the requested ranges\nof data, as described in the Range header of the request.</p>\n<p>If there is only one range, the <code>Content-Type</code> of the whole response is\nset to the type of the document, and a <code>Content-Range</code> is provided.</p>\n<p>If several ranges are sent back, the <code>Content-Type</code> is set to\n<code>multipart/byteranges</code> and each fragment covers one range, with\n<code>Content-Range</code> and <code>Content-Type</code> describing it.</p>",
    via: "https://http.cat/status/206",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 207,
    title: "Multi-Status",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/207",
    descriptionHtml:
      "<p>The HTTP <code>207 Multi-Status</code> response code indicates that there might be a mixture of responses.</p>\n<p>The response body is a <code>text/xml</code> or <code>application/xml</code> HTTP entity with a <code>multistatus</code> root element. The XML body will list all individual response codes.</p>\n  <aside><strong>Note:</strong> The ability to return a collection of resources is part of the WebDAV protocol (it may be received by web applications accessing a WebDAV server).\n  Browsers accessing web pages will never encounter this status code.</aside>",
    via: "https://http.cat/status/207",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 208,
    title: "Already Reported",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/208",
    descriptionHtml:
      '<p>The HTTP <code>208 Already Reported</code> response status is used in a <a href="https://http.cat/status/207">207 Multi-Status</a> response to save space and avoid conflicts. If the same resource is requested several times (for example as part of a collection), with different paths, only the first one is reported with <a href="https://http.cat/status/200">200</a>. Responses for all other bindings will report with this 208 status code, so no conflicts are created and the response stays shorter.</p>\n<aside><strong>Note:</strong>The ability to bind a resource to several paths is an extension to the WebDAV protocol (it may be received by web applications accessing a WebDAV server). Browsers accessing web pages will never encounter this status code.</aside>',
    via: "https://http.cat/status/208",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 226,
    title: "IM Used",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/226",
    descriptionHtml:
      "<p>The HTTP <code>226 IM Used</code> response status, in the context of delta encodings, is a status code set by the server to indicate that it is returning a delta to the GET request that it received. IM stands for <em>Instance Manipulations</em>, the term used to describe an algorithm generating a delta.</p>\n<p>With delta encoding a server responds to <code>GET</code> requests with differences (called deltas) relative to a given base document (rather than the current document). The client uses the <code>A-IM:</code> HTTP header to indicate which differencing algorithm to use and the <code>If-None-Match:</code> header to hint the server about the last version it got. The server generates a delta, sending it back in an HTTP response with the <code>226</code> status code and containing the <code>IM:</code> (with the name of the algorithm used) and <code>Delta-Base:</code> (with the <code>ETag</code> matching the base document associated to the delta) HTTP headers.</p>\n<aside><strong>Note:</strong> Browsers don&#x27;t support delta encoding with HTTP. This status code is sent back by custom servers used by specific clients.</aside>",
    via: "https://http.cat/status/226",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 300,
    title: "Multiple Choices",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/300",
    descriptionHtml:
      "<p>The HTTP <code>300 Multiple Choices</code> redirect status response code indicates that the request has more than one possible response.</p>\n<p>The user-agent or the user should choose one of them.</p>\n<p>As there is no standardized way of choosing one of the responses, this response code is very rarely used.</p>\n<p>If the server has a preferred choice, it should generate a <code>Location</code> header.</p>",
    via: "https://http.cat/status/300",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 301,
    title: "Moved Permanently",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/301",
    descriptionHtml:
      "<p>The HTTP <code>301 Moved Permanently</code> redirect status response code indicates that the requested resource has been definitively moved to the URL given by the <code>Location</code> headers. A browser redirects to the new URL and search engines update their links to the resource.</p>\n<aside><strong>Note:</strong> Although the specification requires the method and the body to remain unchanged when the redirection is performed, not all user-agents meet this requirement. Use the 301 code only as a response for GET or HEAD methods and use the 308 Permanent Redirect for POST methods instead, as the method change is explicitly prohibited with this status.</aside>",
    via: "https://http.cat/status/301",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 302,
    title: "Found",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/302",
    descriptionHtml:
      "<p>The HTTP <code>302 Found</code> redirect\nstatus response code indicates that the resource requested has been temporarily moved to\nthe URL given by the <code>Location</code> header. A browser redirects to this page\nbut search engines don&#x27;t update their links to the resource (in &#x27;SEO-speak&#x27;, it is said\nthat the &#x27;link-juice&#x27; is not sent to the new URL).</p>\n<p>Even if the specification requires the method (and the body) not to be altered when the\nredirection is performed, not all user-agents conform here - you can still find this\ntype of bugged software out there. It is therefore recommended to set the\n<code>302</code> code only as a response for <code>GET</code> or\n<code>HEAD</code> methods and to use <code>307 Temporary Redirect</code> instead, as the method change\nis explicitly prohibited in that case.</p>\n<p>In the cases where you want the method used to be changed to <code>GET</code>, use\n<code>303 See Other</code> instead. This is useful when you want to give a\nresponse to a <code>PUT</code> method that is not the uploaded resource but a\nconfirmation message such as: &#x27;you successfully uploaded XYZ&#x27;.</p>",
    via: "https://http.cat/status/302",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 303,
    title: "See Other",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/303",
    descriptionHtml:
      '<p>The HTTP <code>303 See Other</code>\nredirect status response code indicates that the redirects don&#x27;t link to the requested resource itself, but to another page (such as a confirmation page, a representation of a real-world object ; see <a href="https://en.wikipedia.org/wiki/HTTPRange-14">HTTP range-14</a> ; or an upload-progress page).</p>\n<p>This response code is often sent back as a result of\n<code>PUT</code> or <code>POST</code>.</p>\n<p>The method used to display this redirected page is always <code>GET</code>.</p>',
    via: "https://http.cat/status/303",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 304,
    title: "Not Modified",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/304",
    descriptionHtml:
      "<p>The HTTP <code>304 Not Modified</code> client redirection response\ncode indicates that there is no need to retransmit the requested resources. It is an\nimplicit redirection to a cached resource. This happens when the request method is\na safe method, such as <code>GET</code> or <code>HEAD</code>,\nor when the request is conditional and uses an <code>If-None-Match</code> or an\n<code>If-Modified-Since</code> header.</p>\n<p>The response must not contain a body and must include the headers that would\nhave been sent in an equivalent <code>200 OK</code> response:\n<code>Cache-Control</code>, <code>Content-Location</code>, <code>Date</code>, <code>ETag</code>, <code>Expires</code>, and <code>Vary</code>.</p>\n<aside><strong>Note:</strong> Many developer tools&#x27; network panels\nof browsers create extraneous requests leading to 304 responses, so that\naccess to the local cache is visible to developers.</aside>",
    via: "https://http.cat/status/304",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 305,
    title: "Use Proxy",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status",
    descriptionHtml:
      "<aside><strong>Deprecated:</strong> The HTTP 305 Use Proxy status code has been deprecated due to security concerns and many HTTP clients ignore this status code.</aside>\n<p>HTTP response status code <code>305 Use Proxy</code> is a deprecated HTTP status code returned by an origin server to indicate that the requested resource can only be accessed through a proxy server.</p>\n<p>The <code>305 Use Proxy</code> status code is used to inform the client that the requested resource must be obtained through a proxy server and includes that proxy address in the <code>Set-Proxy</code> HTTP header or in the <code>Location</code> HTTP header.</p>",
    via: "https://http.cat/status/305",
    license: "MIT",
  },
  {
    code: 306,
    title: "(Unused)",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status",
    descriptionHtml:
      "<p>This status code is unused in the HTTP status code registry.</p>",
    via: null,
    license: null,
  },
  {
    code: 307,
    title: "Temporary Redirect",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/307",
    descriptionHtml:
      "<p>HTTP <code>307 Temporary Redirect</code> redirect\nstatus response code indicates that the resource requested has been temporarily moved to\nthe URL given by the <code>Location</code> headers.</p>\n<p>The method and the body of the original request are reused to perform the redirected\nrequest. In the cases where you want the method used to be changed to\n<code>GET</code>, use <code>303 See Other</code> instead. This is\nuseful when you want to give an answer to a <code>PUT</code> method that is not the\nuploaded resources, but a confirmation message (like &quot;You successfully uploaded XYZ&quot;).</p>\n<p>The only difference between <code>307</code> and <code>302</code> is that\n<code>307</code> guarantees that the method and the body will not be changed when the\nredirected request is made. With <code>302</code>, some old clients were incorrectly\nchanging the method to <code>GET</code>: the behavior with non-GET\nmethods and <code>302</code> is then unpredictable on the Web, whereas the behavior with\n<code>307</code> is predictable. For <code>GET</code> requests, their behavior is identical.</p>",
    via: "https://http.cat/status/307",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 308,
    title: "Permanent Redirect",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/308",
    descriptionHtml:
      "<p>The HTTP <code>308 Permanent Redirect</code> redirect status response code\nindicates that the resource requested has been definitively moved to the URL given by\nthe <code>Location</code> headers. A browser redirects to this page and search\nengines update their links to the resource (in &#x27;SEO-speak&#x27;, it is said that the\n&#x27;link-juice&#x27; is sent to the new URL).</p>\n<p>The request method and the body will not be altered, whereas <code>301</code> may\nincorrectly sometimes be changed to a <code>GET</code> method.</p>\n<aside><strong>Note:</strong> Some Web applications may use the\n308 Permanent Redirect in a non-standard way and for other purposes. For\nexample, Google Drive uses a 308 Resume Incomplete response to indicate\nto the client when an incomplete upload stalled.</aside>",
    via: "https://http.cat/status/308",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 400,
    title: "Bad Request",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/400",
    descriptionHtml:
      "<p>The HTTP <code>400 Bad Request</code> response status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error (for example, malformed request syntax, invalid request message framing, or deceptive request routing).</p>\n<aside><strong>Warning:</strong> The client should not repeat this request without modification.</aside>",
    via: "https://http.cat/status/400",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 401,
    title: "Unauthorized",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/401",
    descriptionHtml:
      "<p>The HTTP <code>401 Unauthorized</code> response status code indicates that the client request has not been\ncompleted because it lacks valid authentication credentials for the requested resource.</p>\n<p>This status code is sent with an HTTP <code>WWW-Authenticate</code> response header that contains\ninformation on how the client can request for the resource again after prompting the user for authentication credentials.</p>\n<p>This status code is similar to the <code>403 Forbidden</code> status code, except that in situations resulting in this\nstatus code, user authentication can allow access to the resource.</p>",
    via: "https://http.cat/status/401",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 402,
    title: "Payment Required",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/402",
    descriptionHtml:
      "<aside><strong>Experimental:</strong> This is an experimental technology. Check the Browser compatibility table carefully before using this in production.</aside>\n<p>The HTTP <code>402 Payment Required</code> is a nonstandard response status code that is reserved for future use. This status code was created to enable digital cash or (micro) payment systems and would indicate that the requested content is not available until the client makes a payment.</p>\n<p>Sometimes, this status code indicates that the request cannot be processed until the client makes a payment. However, no standard use convention exists and different entities use it in different contexts.</p>",
    via: "https://http.cat/status/402",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 403,
    title: "Forbidden",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/403",
    descriptionHtml:
      "<p>The HTTP <code>403 Forbidden</code> response status code indicates that the server understands the request but refuses to authorize it.</p>\n<p>This status is similar to <code>401</code>, but for the <code>403 Forbidden</code> status code, re-authenticating makes no difference. The access is tied to the application logic, such as insufficient rights to a resource.</p>",
    via: "https://http.cat/status/403",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 404,
    title: "Not Found",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/404",
    descriptionHtml:
      "<p>The HTTP <code>404 Not Found</code> response status code indicates that the server cannot find the requested resource.\nLinks that lead to a <code>404</code> page are often called broken or dead links and can be subject to link rot.</p>\n<p>A <code>404</code> status code only indicates that the resource is missing: not whether the absence is temporary or permanent.\nIf a resource is permanently removed, use the <code>410 Gone</code> status instead.</p>",
    via: "https://http.cat/status/404",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 405,
    title: "Method Not Allowed",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/405",
    descriptionHtml:
      "<p>The HTTP <code>405 Method Not Allowed</code> response status code indicates that the server knows the request method, but the target resource doesn&#x27;t support this method.</p>\n<p>The server must generate an <code>Allow</code> header field in a <code>405</code> status code response. The field must contain a list of methods that the target resource currently supports.</p>",
    via: "https://http.cat/status/405",
    license: "MIT",
  },
  {
    code: 406,
    title: "Not Acceptable",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/406",
    descriptionHtml:
      "<p>The HTTP <code>406 Not Acceptable</code> client error response code indicates that the server cannot produce a response matching\nthe list of acceptable values defined in the request&#x27;s proactive content negotiation headers, and\nthat the server is unwilling to supply a default representation.</p>\n<p>Proactive content negotiation headers include:</p>\n<ul>\n<li><code>Accept</code></li>\n<li><code>Accept-Encoding</code></li>\n<li><code>Accept-Language</code></li>\n</ul>\n<p>In practice, this error is very rarely used. Instead of responding using this error\ncode, which would be cryptic for the end user and difficult to fix, servers ignore the\nrelevant header and serve an actual page to the user. It is assumed that even if the\nuser won&#x27;t be completely happy, they will prefer this to an error code.</p>\n<p>If a server returns such an error status, the body of the message should contain the\nlist of the available representations of the resources, allowing the user to choose\namong them.</p>",
    via: "https://http.cat/status/406",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 407,
    title: "Proxy Authentication Required",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/407",
    descriptionHtml:
      "<p>The HTTP <code>407 Proxy Authentication Required</code> client error status response code indicates\nthat the request has not been applied because it lacks valid authentication credentials\nfor a proxy server that is between the browser and the server that can access the requested resource.</p>\n<p>This status is sent with a <code>Proxy-Authenticate</code> header that contains information on how to authorize correctly.</p>",
    via: "https://http.cat/status/407",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 408,
    title: "Request Timeout",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/408",
    descriptionHtml:
      "<p>The HTTP <code>408 Request Timeout</code> response status code means that the\nserver would like to shut down this unused connection. It is sent on an idle connection\nby some servers, even without any previous request by the client.</p>\n<p>A server should send the &quot;close&quot; <code>Connection</code> header field in the\nresponse, since <code>408</code> implies that the server has decided to close the\nconnection rather than continue waiting.</p>\n<p>This response is used much more since some browsers, like Chrome, Firefox 27+, and IE9,\nuse HTTP pre-connection mechanisms to speed up surfing.</p>\n<aside><strong>Note:</strong> some servers merely shut down the connection without sending\nthis message.</aside>",
    via: "https://http.cat/status/408",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 409,
    title: "Conflict",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/409",
    descriptionHtml:
      "<p>The HTTP <code>409 Conflict</code> response status code indicates a request conflict with the current state of the target resource.</p>\n<p>Conflicts are most likely to occur in response to a <code>PUT</code> request. For example, you may get a <code>409</code> response when uploading a file that is older than the existing one on the server, resulting in a version control conflict.</p>",
    via: "https://http.cat/status/409",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 410,
    title: "Gone",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/410",
    descriptionHtml:
      "<p>The HTTP <code>410 Gone</code> client error response code indicates that access to the target resource is no longer available at the origin server and that this condition is likely to be permanent.</p>\n<p>If you don&#x27;t know whether this condition is temporary or permanent, a <code>404</code> status code should be used instead.</p>\n<aside><strong>Note:</strong> A 410 response is cacheable by default.</aside>",
    via: "https://http.cat/status/410",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 411,
    title: "Length Required",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/411",
    descriptionHtml:
      "<p>The HTTP <code>411 Length Required</code> client error response code indicates\nthat the server refuses to accept the request without a defined <code>Content-Length</code> header.</p>\n<aside><strong>Note:</strong> by specification, when sending data in a series of chunks, the\nContent-Length header is omitted and at the beginning of each chunk you\nneed to add the length of the current chunk in hexadecimal format. See\nTransfer-Encoding for more details.</aside>",
    via: "https://http.cat/status/411",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 412,
    title: "Precondition Failed",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/412",
    descriptionHtml:
      "<p>The HTTP <code>412 Precondition Failed</code> client error response code\nindicates that access to the target resource has been denied. This happens with\nconditional requests on methods other than <code>GET</code> or\n<code>HEAD</code> when the condition defined by the\n<code>If-Unmodified-Since</code> or <code>If-None-Match</code> headers is not\nfulfilled. In that case, the request, usually an upload or a modification of a resource,\ncannot be made and this error response is sent back.</p>",
    via: "https://http.cat/status/412",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 413,
    title: "Content Too Large",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/413",
    descriptionHtml:
      "<p>The HTTP <code>413 Content Too Large</code> response status code indicates that the request entity is larger than limits defined by server; the server might close the connection or return a <code>Retry-After</code> header field.</p>\n<p>Prior to RFC 9110 the response phrase for the status was Payload Too Large. That name is still widely used.</p>",
    via: "https://http.cat/status/413",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 414,
    title: "URI Too Long",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/414",
    descriptionHtml:
      "<p>The HTTP <code>414 URI Too Long</code> response status code indicates\nthat the URI requested by the client is longer than the server is willing to interpret.</p>\n<p>There are a few rare conditions when this might occur:</p>\n<ul>\n<li>when a client has improperly converted a <code>POST</code> request to a <code>GET</code> request with long query information,</li>\n<li>when the client has descended into a loop of redirection (for example, a redirected\nURI prefix that points to a suffix of itself),</li>\n<li>or when the server is under attack by a client attempting to exploit potential\nsecurity holes.</li>\n</ul>",
    via: "https://http.cat/status/414",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 415,
    title: "Unsupported Media Type",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/415",
    descriptionHtml:
      "<p>The HTTP <code>415 Unsupported Media Type</code> client error response\ncode indicates that the server refuses to accept the request because the payload format\nis in an unsupported format.</p>\n<p>The format problem might be due to the request&#x27;s indicated\n<code>Content-Type</code> or <code>Content-Encoding</code>, or as a result of inspecting the data directly.</p>",
    via: "https://http.cat/status/415",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 416,
    title: "Range Not Satisfiable",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/416",
    descriptionHtml:
      "<p>The HTTP <code>416 Range Not Satisfiable</code> error response code indicates that a server cannot serve the requested ranges. The most likely reason is that the document doesn&#x27;t contain such ranges, or that the Range header value, though syntactically correct, doesn&#x27;t make sense.</p>\n<p>The <code>416</code> response message contains a <code>Content-Range</code> indicating an unsatisfied range (that is a <code>&#x27;*&#x27;</code>) followed by a <code>&#x27;/&#x27;</code> and the current length of the resource. E.g. <code>Content-Range: bytes */12777</code>.</p>\n<p>Faced with this error, browsers usually either abort the operation (for example, a download will be considered as non-resumable) or ask for the whole document again.</p>",
    via: "https://http.cat/status/416",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 417,
    title: "Expectation Failed",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/417",
    descriptionHtml:
      "<p>The HTTP <code>417 Expectation Failed</code> client error response code indicates that the\nexpectation given in the request&#x27;s <code>Expect</code> header could not be met.</p>",
    via: "https://http.cat/status/417",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 418,
    title: "I'm a Teapot",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/418",
    descriptionHtml:
      "<p>The HTTP <code>418 I&#x27;m a teapot</code> client error response code indicates that the server refuses to brew coffee because it is, permanently, a teapot.</p>\n<p>A combined coffee/tea pot that is temporarily out of coffee should instead return 503. This error is a reference to Hyper Text Coffee Pot Control Protocol defined in April Fools&#x27; jokes in 1998 and 2014.</p>\n<p>Some websites use this response for requests they do not wish to handle, such as automated queries.</p>",
    via: "https://http.cat/status/418",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 421,
    title: "Misdirected Request",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/421",
    descriptionHtml:
      "<p>The HTTP <code>421 Misdirected Request</code> client error response code indicates that the request was directed to a server that is not able to produce a response. This might be possible if a connection is reused or if an alternative service is selected.</p>",
    via: "https://http.cat/status/421",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 422,
    title: "Unprocessable Content",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/422",
    descriptionHtml:
      "<p>The HTTP <code>422 Unprocessable Content</code> response status code indicates\nthat the server understands the content type of the request entity, and the syntax of\nthe request entity is correct, but it was unable to process the contained instructions.</p>\n<aside><strong>Warning:</strong> The client should not repeat this request without modification.</aside>",
    via: "https://http.cat/status/422",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 423,
    title: "Locked",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/423",
    descriptionHtml:
      "<p>The HTTP <code>423 Locked</code> error response code indicates that either the resources tentatively targeted by is locked, meaning it can&#x27;t be accessed. Its content should contain some information in WebDAV&#x27;s XML format.</p>\n<aside><strong>Note:</strong> The ability to lock a resource is specific to some WebDAV servers. Browsers accessing web pages will never encounter this status code; in the erroneous cases it happens, they will handle it as a generic 400 status code.</aside>",
    via: "https://http.cat/status/423",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 424,
    title: "Failed Dependency",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/424",
    descriptionHtml:
      "<p>The HTTP <code>424 Failed Dependency</code> client error response code indicates that the method could not be performed on the resource because the requested action depended on another action, and that action failed.</p>\n<p>Regular web servers will normally not return this status code. But some other protocols, like WebDAV, can return it. For example, in WebDAV, if a <code>PROPPATCH</code> request was issued, and one command fails then automatically every other command will also fail with <code>424 Failed Dependency</code>.</p>",
    via: "https://http.cat/status/424",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 425,
    title: "Too Early",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/425",
    descriptionHtml:
      "<p>The HTTP <code>425 Too Early</code> response status code indicates that the server is unwilling to risk processing a request\nthat might be replayed, which creates the potential for a replay attack.</p>",
    via: "https://http.cat/status/425",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 426,
    title: "Upgrade Required",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/426",
    descriptionHtml:
      "<p>The HTTP <code>426 Upgrade Required</code> client error response code\nindicates that the server refuses to perform the request using the current protocol but\nmight be willing to do so after the client upgrades to a different protocol.</p>\n<p>The server sends an <code>Upgrade</code> header with this response to indicate the required protocol(s).</p>",
    via: "https://http.cat/status/426",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 428,
    title: "Precondition Required",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/428",
    descriptionHtml:
      "<p>The HTTP <code>428 Precondition Required</code> response status code indicates that the server requires the request to be conditional.</p>\n<p>Typically, this means that a required precondition header, such as <code>If-Match</code>, is missing.</p>\n<p>When a precondition header is not matching the server side state, the response should be <code>412 Precondition Failed</code>.</p>",
    via: "https://http.cat/status/428",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 429,
    title: "Too Many Requests",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429",
    descriptionHtml:
      "<p>The HTTP <code>429 Too Many Requests</code> response status code indicates the user has sent too many requests in a given amount of time (&quot;rate limiting&quot;).</p>\n<p>A <code>Retry-After</code> header might be included to this response indicating how long to wait before making a new request.</p>",
    via: "https://http.cat/status/429",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 431,
    title: "Request Header Fields Too Large",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/431",
    descriptionHtml:
      "<p>The HTTP <code>431 Request Header Fields Too Large</code> response status code\nindicates that the server refuses to process the request because the request&#x27;s HTTP headers are too long.\nThe request may be resubmitted after reducing the size of the request headers.</p>\n<p><code>431</code> can be used when the total size of request headers is too large,\nor when a single header field is too large. To help those running into\nthis error, indicate which of the two is the problem in the response body ; ideally,\nalso include which headers are too large. This lets users attempt to fix the problem,\nsuch as by clearing their cookies.</p>\n<p>Servers will often produce this status if:</p>\n<ul>\n<li>The <code>Referer</code> URL is too long</li>\n<li>There are too many Cookies sent in the request</li>\n</ul>",
    via: "https://http.cat/status/431",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 451,
    title: "Unavailable For Legal Reasons",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/451",
    descriptionHtml:
      "<p>The HTTP <code>451 Unavailable For Legal Reasons</code> client error response code indicates that the user requested a resource that is not available due to legal reasons, such as a web page for which a legal action has been issued.</p>",
    via: "https://http.cat/status/451",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 500,
    title: "Internal Server Error",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/500",
    descriptionHtml:
      "<p>The HTTP <code>500 Internal Server Error</code> server error response code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.</p>\n<p>This error response is a generic &quot;catch-all&quot; response. Usually, this indicates the server cannot find a better <code>5xx</code> error code to response. Sometimes, server administrators log error responses like the <code>500</code> status code with more details about the request to prevent the error from happening again in the future.</p>",
    via: "https://http.cat/status/500",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 501,
    title: "Not Implemented",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/501",
    descriptionHtml:
      "<p>The HTTP <code>501 Not Implemented</code> server error response code means that the server does not support the functionality required to fulfill the request.</p>\n<p>This status can also send a <code>Retry-After</code> header, telling the requester when to check back to see if the functionality is supported by then.</p>\n<p><code>501</code> is the appropriate response when the server does not recognize the request method and is incapable of supporting it for any resource. The only methods that servers are required to support (and therefore that must not return <code>501</code>) are <code>GET</code> and <code>HEAD</code>.</p>\n<p>If the server does recognize the method, but intentionally does not support it, the appropriate response is <code>405 Method Not Allowed</code>.</p>\n<aside><strong>Note:</strong> A 501 error is not something you can fix, but requires a fix by the web server you are trying to access.</aside>\n<aside><strong>Note:</strong>A 501 response is cacheable by default; that is, unless caching headers instruct otherwise.</aside>",
    via: "https://http.cat/status/501",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 502,
    title: "Bad Gateway",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/502",
    descriptionHtml:
      "<p>The HTTP <code>502 Bad Gateway</code> server error response code indicates that the server, while acting as a gateway or proxy, received an invalid response from the upstream server.</p>\n<aside><strong>Note:</strong> A Gateway might refer to different things in networking and a 502 error is usually not something you can fix, but requires a fix by the web server or the proxies you are trying to get access through.</aside>",
    via: "https://http.cat/status/502",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 503,
    title: "Service Unavailable",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/503",
    descriptionHtml:
      "<p>The HTTP <code>503 Service Unavailable</code> server error response code indicates that the server is not ready to handle the request.</p>\n<p>Common causes are a server that is down for maintenance or that is overloaded. This response should be used for temporary conditions and the <code>Retry-After</code> HTTP header should, if possible, contain the estimated time for the recovery of the service.</p>\n<p>Caching-related headers that are sent along with this response should be taken care of, as a <code>503</code> status is often a temporary condition and responses shouldn&#x27;t usually be cached.</p>\n<aside><strong>Note:</strong> together with this response, a user-friendly page explaining the problem should be sent.</aside>",
    via: "https://http.cat/status/503",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 504,
    title: "Gateway Timeout",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/504",
    descriptionHtml:
      "<p>The HTTP <code>504 Gateway Timeout</code> server error response code indicates that the server, while acting as a gateway or proxy, did not get a response in time from the upstream server that it needed in order to complete the request.</p>\n<aside><strong>Note:</strong> A Gateway might refer to different things in networking and a 504 error is usually not something you can fix, but requires a fix by the web server or the proxies you are trying to get access through.</aside>",
    via: "https://http.cat/status/504",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 505,
    title: "HTTP Version Not Supported",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status",
    descriptionHtml:
      "<p>The server does not support the HTTP version used by the request.</p>",
    via: null,
    license: null,
  },
  {
    code: 506,
    title: "Variant Also Negotiates",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/506",
    descriptionHtml:
      "<p>The HTTP <code>506 Variant Also Negotiates</code> response status code may be given in the context of Transparent Content Negotiation (see RFC 2295). This protocol enables a client to retrieve the best variant of a given resource, where the server supports multiple variants.</p>\n<p>The Variant Also Negotiates status code indicates an internal server configuration error in which the chosen variant is itself configured to engage in content negotiation, so is not a proper negotiation endpoint.</p>",
    via: "https://http.cat/status/506",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 507,
    title: "Insufficient Storage",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/507",
    descriptionHtml:
      "<p>The HTTP <code>507 Insufficient Storage</code> response status code may be given in the context of the WebDAV protocol (see RFC 4918).</p>\n<p>It indicates that a method could not be performed because the server cannot store the representation needed to successfully complete the request.</p>",
    via: "https://http.cat/status/507",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 508,
    title: "Loop Detected",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/508",
    descriptionHtml:
      "<p>The HTTP <code>508 Loop Detected</code>\nresponse status code may be given in the context of the WebDAV protocol.</p>\n<p>It indicates that the server terminated an operation because it encountered an infinite\nloop while processing a request with <code>&quot;Depth: infinity&quot;</code>. This status indicates that the entire operation failed.</p>",
    via: "https://http.cat/status/508",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 510,
    title: "Not Extended",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/510",
    descriptionHtml:
      "<p>The HTTP <code>510 Not Extended</code>\nresponse status code is sent in the context of the HTTP Extension Framework, defined in\nRFC 2774.</p>\n<p>In that specification a client may send a request that contains an extension\ndeclaration, that describes the extension to be used. If the server receives such a\nrequest, but any described extensions are not supported for the request, then the server responds with the <code>510</code> status code.</p>",
    via: "https://http.cat/status/510",
    license: "CC-BY-SA-2.5",
  },
  {
    code: 511,
    title: "Network Authentication Required",
    source:
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/511",
    descriptionHtml:
      "<p>The HTTP <code>511 Network Authentication Required</code> response\nstatus code indicates that the client needs to authenticate to gain network access.</p>\n<p>This status is not generated by origin servers, but by intercepting proxies that\ncontrol access to the network.</p>\n<p>Network operators sometimes require some authentication, acceptance of terms, or other\nuser interaction before granting access (for example in an internet café or at an\nairport). They often identify clients who have not done so using their Media Access\nControl (MAC) addresses.</p>",
    via: "https://http.cat/status/511",
    license: "CC-BY-SA-2.5",
  },
];
