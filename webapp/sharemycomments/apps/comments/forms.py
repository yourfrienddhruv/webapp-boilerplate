from django.utils.translation import ugettext_lazy as _
from django import forms
from django.forms import Form
from models import Comment


class AddCommentForm(Form):
    title = forms.CharField(label=_('Title'), error_messages={'required': _('comment title required')}, max_length=50,
                            required=True)
    description = forms.CharField(label=_('Description'), max_length=1000, required=False)

    def to_db_object(self, uid):
        title = self.cleaned_data['title']
        description = self.cleaned_data['description']
        return Comment(title=title, description=description, uid=uid)
