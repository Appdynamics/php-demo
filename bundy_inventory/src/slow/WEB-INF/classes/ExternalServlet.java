import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class ExternalServlet extends HttpServlet {
   @Override
   public void doGet(HttpServletRequest request, HttpServletResponse response)
         throws IOException, ServletException {

      response.setContentType("text/html");
      PrintWriter out = response.getWriter();
        try {
            Thread.sleep(200);
        } catch (InterruptedException e) { }

      // Write the response message, in an HTML page
      try {
         out.println("<html>");
         out.println("<head><title>Hello, World</title></head>");
         out.println("<body>");
         out.println("<h1>Let's get slow</h1>");  // says Hello
         out.println("</body></html>");
      } finally {
         out.close();  // Always close the output writer
      }
   }
}
