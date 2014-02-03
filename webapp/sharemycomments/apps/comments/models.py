from django.db import models
from django.utils.translation import ugettext_lazy as _


class Comment(models.Model):
    title = models.TextField(_('Title'), blank=False)
    description = models.TextField(_('Description'), max_length=250, blank=True, null=True)
    uid = models.IntegerField(_('UserID'), blank=False)

    #user is optional
    #user = models.ForeignKey(User, related_name="user_comment", blank=True, null=True)

    #comment_name = models.CharField(_('Commentor Nickname'), max_length=50, blank=True, null=True)
    #comment_date = models.DateField(_('Comment Date'), auto_now=True)
    #comment_ip = models.CharField(_('Commentor IP'), max_length=50, blank=True, null=True)

    #Comment Entity
    #subject = generic.GenericForeignKey(ct_field='content_type', fk_field='object_id')
    #content_type = models.ForeignKey(ContentType)
    #object_id = models.PositiveIntegerField()

    is_deleted = models.BooleanField(_("Delete"), default=False)

    def get_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'uid': self.uid,
            'is_deleted': self.is_deleted,
        }

        #    def __unicode__(s:self):
        #        return u"%s" % (self.get_json())

    class Meta:
        db_table = 'comment'
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'
        ordering = ['-id']
