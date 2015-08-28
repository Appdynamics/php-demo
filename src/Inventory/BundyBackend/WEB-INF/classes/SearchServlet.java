import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;

public class SearchServlet extends HttpServlet {
   @Override
   public void doGet(HttpServletRequest request, HttpServletResponse response)
         throws IOException, ServletException {

      response.setContentType("text/html");
      PrintWriter out = response.getWriter();

      String url = "http://www.shoewarehouse.com:8080/slow/sayhello";
      URL obj = new URL(url);
      HttpURLConnection con = (HttpURLConnection) obj.openConnection();
      con.setRequestMethod("GET");

                BufferedReader in = new BufferedReader(
                        new InputStreamReader(con.getInputStream()));
                String inputLine;
                StringBuffer resp = new StringBuffer();

                while ((inputLine = in.readLine()) != null) {
                        resp.append(inputLine);
                }
                in.close();
      try {
         out.println("<html>");
         out.println("<head><title>Hello, World</title></head>");
         out.println("<body>");
         out.println("<h1>Search Servlet</h1>");  // says Hello
         out.println(resp.toString());
         out.println("</body></html>");
      } finally {
         out.close();  // Always close the output writer
      }
   }
}
