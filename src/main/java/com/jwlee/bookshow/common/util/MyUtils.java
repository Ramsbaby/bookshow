package com.jwlee.bookshow.common.util;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import javax.net.ssl.*;
import java.io.ByteArrayOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class MyUtils {

	/**
	 * 인코딩 타입을 변경해주는 메소드
	 * 
	 * @param source
	 * @param encodeType
	 * @return
	 */
	public static String encodeStr(byte[] source, String encodeType) {

		//
		String returnValue = "";

		//
		try {

			returnValue = new String(source, 0, source.length, encodeType);
		} catch (Exception e) {
			e.printStackTrace();
		}

		//
		return returnValue;
	}

	/**
	 * 인코딩 타입을 변경해주는 메소드
	 * 
	 * @param source
	 * @param encodeType
	 * @return
	 */
	public static String encodeStr(String source, String encodeType) {

		return encodeStr(source, "8859_1", encodeType);
	}

	/**
	 * 인코딩 타입을 변경해 주는 메소드.
	 * 
	 * @param source
	 * @return
	 */
	public static String encodeStr(String source) {

		return encodeStr(source, "UTF-8");
	}

	/**
	 * 인코딩 타입을 변경해 주는 메소드.
	 * 
	 * @param source
	 * @param sourceEncodeType
	 * @param targetEncodeType
	 * @return
	 */
	public static String encodeStr(String source, String sourceEncodeType, String targetEncodeType) {

		String returnValue = null;
		try {
			returnValue = new String(source.getBytes(sourceEncodeType), targetEncodeType);
		} catch (Exception e) {
		}

		return returnValue;
	}

	/**
	 * 배열로 들어온 경우에도 처리해 준다.
	 * 
	 * @param sources
	 * @return
	 */
	public static String[] encodeStr(String[] sources) {

		String[] returnValue = null;

		String[] source = sources;
		if (source == null) {
			return null;
		} else {

			returnValue = new String[sources.length];
			for (int i = 0; i < source.length; i++) {
				returnValue[i] = encodeStr(source[i]);
			}
		}

		return returnValue;
	}

	/**
	 * url로 접근 해서 source를 받아오는 메소드 (POST방식) created by jeeyong 타 웹사이트의 API를 Ajax에서
	 * 불러오기 위한 방법으로 만들었음.
	 * 
	 * @param url
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public static String getHttp2String(String url, Map<String, String> param) throws Exception {

		return getHttpPOST2String(url, null, param, false);
	}

	/**
	 * url로 접근 해서 source를 받아오는 메소드 (GET방식) created by jeeyong 타 웹사이트의 API를 Ajax에서
	 * 불러오기 위한 방법으로 만들었음.
	 * 
	 * @param url
	 * @param
	 * @return
	 * @throws Exception
	 */
	public static String getHttpGET2String(String url, Map<String, String> params) throws Exception {
		return getHttpGET2String(url, null, params);
	}

	/**
	 * url로 접근 해서 source를 받아오는 메소드 (GET방식) created by jeeyong 타 웹사이트의 API를 Ajax에서
	 * 불러오기 위한 방법으로 만들었음.
	 * 
	 * @param url
	 * @param headers
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public static String getHttpGET2String(String url, Map<String, String> headers, Map<String, String> params)
			throws Exception {

		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				if (url.lastIndexOf("?") > -1) {
					url = url + "&" + key + "=" + URLEncoder.encode(params.get(key), "UTF-8");
				} else {
					url = url + "?" + key + "=" + URLEncoder.encode(params.get(key), "UTF-8");
				}
			}
		}

		//
		HttpGet get = new HttpGet(url);
		if (headers != null && !headers.isEmpty()) {

			for (String key : headers.keySet()) {

				get.addHeader(key, headers.get(key));
			}
		}

		HttpClient httpclient = new DefaultHttpClient();
		HttpResponse response = httpclient.execute(get);

		HttpEntity entity = response.getEntity();
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		entity.writeTo(out);

		return new String(out.toByteArray(), Charset.forName("UTF-8"));
	}

	/**
	 * SSL 인증서를 사용하는 요청에 대해 처리해 주는 부분
	 * 
	 * @param url
	 * @param headers
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public static String getHttpsGET2String(String url, Map<String, String> headers, Map<String, String> params)
			throws Exception {

		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				if (url.lastIndexOf("?") > -1) {
					url = url + "&" + key + "=" + URLEncoder.encode(params.get(key), "UTF-8");
				} else {
					url = url + "?" + key + "=" + URLEncoder.encode(params.get(key), "UTF-8");
				}
			}
		}

		//
		/* Start of Fix */
		TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() {

			public X509Certificate[] getAcceptedIssuers() {
				return null;
			}

			@Override
			public void checkClientTrusted(X509Certificate[] arg0, String arg1)
					throws CertificateException {
			}

			@Override
			public void checkServerTrusted(X509Certificate[] arg0, String arg1)
					throws CertificateException {
			}
		} };

		SSLContext sc = SSLContext.getInstance("SSL");
		sc.init(null, trustAllCerts, new java.security.SecureRandom());
		HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());

		// Create all-trusting host name verifier
		HostnameVerifier allHostsValid = new HostnameVerifier() {

			public boolean verify(String hostname, SSLSession session) {
				return true;
			}
		};
		// Install the all-trusting host verifier
		HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
		/* End of the fix */

		HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();
		if (headers != null && !headers.isEmpty()) {

			for (String key : headers.keySet()) {

				con.addRequestProperty(key, headers.get(key));
			}
		}

		Reader reader = new InputStreamReader(con.getInputStream(), Charset.forName("UTF-8"));

		StringBuffer returnValue = new StringBuffer();
		while (true) {
			int ch = reader.read();
			if (ch == -1)
				break;

			returnValue.append((char) ch);
		}

		//
		return returnValue.toString();

	}

	/**
	 * SSL 인증서를 사용하는 요청에 대해 처리해 주는 부분
	 *
	 * @param url
	 * @param headers
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public static String getHttpsPOST2String(String url, Map<String, String> headers, Map<String, String> params)
			throws Exception {

		String post_parmas = "";
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				post_parmas = post_parmas + "&" + key + "=" + URLEncoder.encode(params.get(key), "UTF-8");
			}
		}

		//
		/* Start of Fix */
		TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() {

			public X509Certificate[] getAcceptedIssuers() {
				return null;
			}

			@Override
			public void checkClientTrusted(X509Certificate[] arg0, String arg1)
					throws CertificateException {
			}

			@Override
			public void checkServerTrusted(X509Certificate[] arg0, String arg1)
					throws CertificateException {
			}
		} };

		SSLContext sc = SSLContext.getInstance("SSL");
		sc.init(null, trustAllCerts, new java.security.SecureRandom());
		HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());

		// Create all-trusting host name verifier
		HostnameVerifier allHostsValid = new HostnameVerifier() {

			public boolean verify(String hostname, SSLSession session) {
				return true;
			}
		};
		// Install the all-trusting host verifier
		HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
		/* End of the fix */

		HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();
		con.setRequestMethod("POST");
		con.setDoOutput(true);
		if (headers != null && !headers.isEmpty()) {

			for (String key : headers.keySet()) {

				con.addRequestProperty(key, headers.get(key));
			}
		}
		OutputStream os = con.getOutputStream();
		os.write(post_parmas.getBytes());
		os.flush();
		os.close();

		Reader reader = new InputStreamReader(con.getInputStream(), Charset.forName("UTF-8"));

		StringBuffer returnValue = new StringBuffer();
		while (true) {
			int ch = reader.read();
			if (ch == -1)
				break;

			returnValue.append((char) ch);
		}

		//
		return returnValue.toString();

	}

	/**
	 * (비인증) SSL 인증서를 통과 시켜주는 소스 {@link <a href=
	 * "http://beyondj2ee.tumblr.com/post/14507308404/httpcomponents-httpclient-4x%EC%97%90%EC%84%9C-https-%EC%84%9C%EB%B2%84-%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0">http://beyondj2ee.tumblr.com/post/14507308404/httpcomponents-httpclient-4x%EC%97%90%EC%84%9C-https-%EC%84%9C%EB%B2%84-%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0</a>
	 * }
	 * 
	 * @param httpclient
	 * @throws Exception
	 */
	private static void setTestHttpClient(HttpClient httpclient) throws Exception {
		TrustManager easyTrustManager = new X509TrustManager() {
			@Override
			public X509Certificate[] getAcceptedIssuers() {
				return null;
			}

			@Override
			public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
			}

			@Override
			public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
			}
		};

		SSLContext sslcontext = SSLContext.getInstance("TLS");
		sslcontext.init(null, new TrustManager[] { easyTrustManager }, null);
		//
		SSLSocketFactory socketFactory = new SSLSocketFactory(sslcontext,
				org.apache.http.conn.ssl.SSLSocketFactory.STRICT_HOSTNAME_VERIFIER);

		// 본인 인증 방식일 경우 (Self-Signed Certificate)
		// SSLSocketFactory socketFactory = new SSLSocketFactory(sslcontext,
		// SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);

		Scheme sch = new Scheme("https", 443, socketFactory);
		httpclient.getConnectionManager().getSchemeRegistry().register(sch);
	}

	/**
	 * url로 접근 해서 source를 받아오는 메소드 (GET방식) created by kimjy 타 웹사이트의 API를 Ajax에서 불러오기
	 * 위한 방법으로 만들었음.
	 * 
	 * @param url
	 * @param headers
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public static String getHttpGET2String(String url, Map<String, String> headers, Map<String, String> params,
			boolean isTest) throws Exception {

		HttpClient httpclient = new DefaultHttpClient();
		String responseBody = null;
		try {
			if (params != null && !params.isEmpty()) {
				for (String key : params.keySet()) {
					if (url.lastIndexOf("?") > -1) {
						url = url + "&" + key + "=" + URLEncoder.encode(params.get(key), "UTF-8");
					} else {
						url = url + "?" + key + "=" + URLEncoder.encode(params.get(key), "UTF-8");
					}
				}
			}

			//
			HttpGet get = new HttpGet(url);
			if (headers != null && !headers.isEmpty()) {

				for (String key : headers.keySet()) {

					get.addHeader(key, headers.get(key));
				}
			}

			if (isTest) {
				setTestHttpClient(httpclient);
			}
			HttpResponse response = httpclient.execute(get);
			responseBody = EntityUtils.toString(response.getEntity(), "UTF-8");

		} finally {
			httpclient.getConnectionManager().shutdown();
		}

		return responseBody;
	}

	/**
	 * url로 접근 해서 source를 받아오는 메소드 (POST방식) created by kimjy 타 웹사이트의 API를 Ajax에서
	 * 불러오기 위한 방법으로 만들었음.
	 * 
	 * @throws Exception
	 */
	public static String getHttpPOST2String(String url, Map<String, String> headers, Map<String, String> params,
			boolean isTest) throws Exception {
		//
		HttpClient httpclient = new DefaultHttpClient();
		String responseBody = null;
		try {
			HttpPost post = new HttpPost(url);
			if (params != null && !params.isEmpty()) {

				List<BasicNameValuePair> parameters = new ArrayList<BasicNameValuePair>();
				for (String key : params.keySet()) {
					parameters.add(new BasicNameValuePair(key, params.get(key)));
				}

				UrlEncodedFormEntity reqEntity = new UrlEncodedFormEntity(parameters, "UTF-8");
				post.setEntity(reqEntity);
			}

			if (headers != null && !headers.isEmpty()) {

				for (String key : headers.keySet()) {

					post.addHeader(key, headers.get(key));
				}
			}

			if (isTest) {
				setTestHttpClient(httpclient);
			}
			HttpResponse response = httpclient.execute(post);
			responseBody = EntityUtils.toString(response.getEntity(), "UTF-8");
		} finally {
			httpclient.getConnectionManager().shutdown();
		}

		return responseBody;
	}

	/**
	 * url로 접근 해서 source를 받아오는 메소드 (DELETE방식) created by kimjy 타 웹사이트의 API를 Ajax에서
	 * 불러오기 위한 방법으로 만들었음.
	 * 
	 * @param url
	 * @param headers
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public static String getHttpDELETE2String(String url, Map<String, String> headers, Map<String, String> params,
			boolean isTest) throws Exception {
		//
		HttpClient httpclient = new DefaultHttpClient();
		String responseBody = null;
		try {
			HttpDelete delete = new HttpDelete(url);

			if (params != null && !params.isEmpty()) {
				for (String key : params.keySet()) {
					if (url.lastIndexOf("?") > -1) {
						url = url + "&" + key + "=" + URLEncoder.encode(params.get(key), "UTF-8");
					} else {
						url = url + "?" + key + "=" + URLEncoder.encode(params.get(key), "UTF-8");
					}
				}
			}

			if (headers != null && !headers.isEmpty()) {
				for (String key : headers.keySet()) {
					delete.addHeader(key, headers.get(key));
				}
			}

			if (isTest) {
				setTestHttpClient(httpclient);
			}
			HttpResponse response = httpclient.execute(delete);
			responseBody = EntityUtils.toString(response.getEntity(), "UTF-8");
		} finally {
			httpclient.getConnectionManager().shutdown();
		}

		return responseBody;
	}

	/**
	 * url로 접근 해서 source를 받아오는 메소드 (GET방식) created by kimjy 타 웹사이트의 API를 Ajax에서 불러오기
	 * 위한 방법으로 만들었음.
	 * 
	 * @param url
	 * @param headers
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public static String getHttpDELETE2String(String url, Map<String, String> headers, Map<String, String> params)
			throws Exception {
		HttpDelete delete = new HttpDelete(url);

		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				if (url.lastIndexOf("?") > -1) {
					url = url + "&" + key + "=" + URLEncoder.encode(params.get(key), "UTF-8");
				} else {
					url = url + "?" + key + "=" + URLEncoder.encode(params.get(key), "UTF-8");
				}
			}
		}

		if (headers != null && !headers.isEmpty()) {

			for (String key : headers.keySet()) {

				delete.addHeader(key, headers.get(key));
			}
		}

		HttpClient httpclient = new DefaultHttpClient();
		HttpResponse response = httpclient.execute(delete);

		HttpEntity entity = response.getEntity();
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		entity.writeTo(out);

		return new String(out.toByteArray(), Charset.forName("UTF-8"));
	}

}
