<!-- <template>
  <div ref="pdfContainer" class="pdf-container"></div>
</template>

<script>
import { getDocument } from "pdfjs-dist/webpack";

export default {
  name: "PdfViewer",
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.loadPdf();
  },
  methods: {
    async loadPdf() {
      const loadingTask = getDocument(this.src);
      const pdf = await loadingTask.promise;
      this.renderPdf(pdf);
    },
    async renderPdf(pdf) {
      const container = this.$refs.pdfContainer;
      const canvas = document.createElement("canvas");
      canvas.id = "pdf-canvas";
      container.appendChild(canvas);
      const context = canvas.getContext("2d");
      const pageNumber = 1; // 可以修改为动态获取或传递参数来显示不同的页面
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.5 }); // 可以调整缩放比例
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await page.render(renderContext).promise;
    },
  },
};
</script>

<style scoped>
.pdf-container {
  width: 100%; /* or any specific width */
  height: 600px; /* or any specific height */
  overflow: auto; /* or scroll if you want scrollable content */
}
</style> -->
