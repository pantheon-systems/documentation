export const createTool = defineTool({
  name: 'widget_create',
  description: 'Create a widget',
});
export const shareTool = defineTool({
  name: 'widget_share',
});
export const restoreTool = defineTool({
  name: 'widget_restore',
});
const token = process.env.WIDGET_API_TOKEN;
const mode = process.env.NODE_ENV;
app.post('/widgets/:id/share', handler);
app.get('/', handler);
// app.get('/commented-out-route', handler);
