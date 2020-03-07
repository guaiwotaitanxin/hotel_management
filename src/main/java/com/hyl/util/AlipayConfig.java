package com.hyl.util;

import java.io.FileWriter;
import java.io.IOException;

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-04-05
 *说明：  ksfxhw3818@sandbox.com   111111
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class AlipayConfig {
	
//↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

	// 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
	public static String app_id = "2016101400685912";
	
	// 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDXoVNPBha49tCL5rULyfApQ3KZ9sFX4Py5LKzNlxvVhbl/iLOzwPW1xFeJCqNlOqB7kj5aP+KAiG+wibqCh3QYutfsy5YCrMDBD7+3FiswqYmdu+Ew0oAEES4aKgjfF7vf86HjG9Z/rLm38e4/jjuipk1sdwQ1WL/FDdCZcmFhwBFspVSysT6uU93q5aCuKG6eTHmy2TOHerWpvZbqeiIW6Dbk/Y+gCraR0B/PildqBr7QnFMXpLfcvIqtqo28m550vyyXi2iph9VtyGOnfErXZ+DWNB2IZXems6FRYA0RFBy9ZiF044hE9GKaP5pbIcaIiXWGRZq11bJWwyPJXeELAgMBAAECggEANZWTfEnJD8HV5U45o2pVUgu+yN/2//2bD/E4KAbrFc6bYEP6VCsZZEgccKPCIv/ErbCT6h2CDerZxocTYCiFAzg7PE8DQjrn05I0VC0gIoGe/yGXPmixA1G5oSrc9YOSXn7Otf9O+H9Vz45BZG3WB/9HsjKJSzB4x2E9e0RfSsjZDywlzuRQ/0SMTM4DbsGHkfagjHBdj/zx1CVOSnwirvCn1EZudn9rTjgsGE048edQkGUU0j9bmZVU9MD9aPX02ai96j+57AdYH+3kqqHoEUmfTYiioyAFBkhLVSZrtZMt3qCh9Wry1fsX1T11ax7axNi5FHX/0FrGLoKfr5dbYQKBgQD5nQkavfsYUVH1EHax6oMbHt3Kddd70ogvB0E1td5Qa+9DdMoRupjxHuzH8Jz+g+jTXWrwRKB0Zb8QUJCbZXrlGbCMDdbHbzLUyZo4T+s/btzqBS+fCZ4tBQJhrzrMziHR9a7qZLRwIJf05KLGYorErmFD5UkKisCM/NMxPiMxaQKBgQDdJbM5P3gf1Kr1cEsnBrgvEa3V4+2o/P7SMdNUmiWX9k70DWswOszx2FC+IZ4ytyT0Wfw0hs7aSi0hLC9CUcsW+/alhV9uFP7D+jHOh1fpH0P/yiIzTJfRVsE5oy/VBsKT8IOtzc3SLYK5F7XfsDcXbGIipU7dF3S9leiOcRZ8UwKBgQCUXpZp0eEtvDCWFVooOPgDJ963mEIkdKjEI3DMZzUk4nNOyl3OGfcM48/krI307x12fYGyHWiup0fhf7Hk3HYnNZTuOs+erect+kN0E3UGuHQRmlGLG+FsaxzWSZ0O3bvWnE2DP6bNO2J3i2uBtlM7w1dHT0OSQ5VeeG1kSMYMeQKBgAQ+twQATeP+hxGTCD5FiL+OjVGvwF4gDRwnzLCxDMuv9LAGmeohFtIFnvcnWgwLK/Bs0cSIWewixF8ApB+Xxlg4mfFvb/eC+6jzYoVeX7ef3ARK8wEdFUT1b1wV39MtAAsq8LwjWTIRoZK/+8PBdC1E7VVQ6wSfcKQ6/m3Nier1AoGBAN3UFCCuy8z3BsFIIzSXqw9KvqAMbAtZfCTtgfAaKfFg/bYMCsG+YELf9h7SMQnoqrDqGYpO0cnBaPGTDmoxfRxOFZjVRWB+0J+hsMSUM6MUtX/yQxfCbmLzUfBbR1MS6lf9m+wtmQDpyou1bS9ohrMjeRT7yGk83FgcDW6UwEV3";
	// 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4pjqRusg6YMmaVh7cbpWfYqYloC212750vpkWXDrYBjuTroU5i0U/yLS7nd/0HPBHzKPC31BEUpvpBDkkhUDmGXPohYIoqKde16BIHHJFaRLtCYI3SYz1+O9GMcxPaOcZSg/ffea2VJHFQCUiWgMzPPdy3DYOvsuX6HnHuhzrGhAi9jg55Y9CiAa69KDp5DfZsfbOQspzxleNdVkgMnb9VIIGI4kY2c60UzLnlK3lME0LCh6+VdUSgdCne6eilClGFg2w7ET+JPhrDFwAUCc5exdzcyOpHbQa3ves7hHLzMCrUK3ywA8HG8dn0F8pH/55FCD+3Ocepaw60LabfH9HwIDAQAB";

	// 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String notify_url = "http://工程公网访问地址/alipay.trade.page.pay-JAVA-UTF-8/notify_url.jsp";

	// 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String return_url = "http://119.23.29.75/hotel_management-1.0-SNAPSHOT/orders/updOrdersByPaied";

	// 签名方式
	public static String sign_type = "RSA2";
	
	// 字符编码格式
	public static String charset = "utf-8";
	
	// 支付宝网关
	public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";
	
	// 支付宝网关
	public static String log_path = "C:\\";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /** 
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

