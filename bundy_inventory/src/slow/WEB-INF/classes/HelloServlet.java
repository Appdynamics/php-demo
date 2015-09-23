import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class HelloServlet extends HttpServlet {
   @Override
   public void doGet(HttpServletRequest request, HttpServletResponse response)
         throws IOException, ServletException {

      response.setContentType("text/html");
      PrintWriter out = response.getWriter();

      String slow = null;
      double rand = Math.random();
      if (rand < .06) {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) { }
        slow = "Yes";
      } else {
        slow = "No";
      }


      // Write the response message, in an HTML page
      try {
         out.println("<html>");
         out.println("<head><title>Hello, World</title></head>");
         out.println("<body>");
         out.println("<h1>Let's get slow</h1>");  // says Hello
         out.println("<p>Slow: <strong>" + slow + "</strong></p>");
         out.println("</body></html>");
      } finally {
         out.close();  // Always close the output writer
      }
   }
}
