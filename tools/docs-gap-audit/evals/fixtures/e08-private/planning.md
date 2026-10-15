# Restore a deleted widget (planning)

INTERNAL ONLY. Do not publish any of this note.

Readers who delete a widget by mistake need to know the 30 day recovery window and how to restore it.

Internal details: the restore job runs on staging environment ENV-1234-INTERNAL and uses the service account svc-widget-restore. The first customer to ask was Initech. The recovery window is enforced by the nightly purge worker.

Steps (draft): open the Trash view, select the widget, choose Restore.
