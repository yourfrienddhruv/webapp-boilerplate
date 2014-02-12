from sharemycomments.apps.fileupload.forms import UploadFileForm, NameForm
import json
from sharemycomments.utils import json_response

@json_response
def upload_file(request):
    print "Processing upload file...."
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        try:
            if form.is_valid():
                handle_uploaded_file(request.FILES['file'])
                return {"success":"true"}
            else:
                print "Processing...."
                return {"status" : 503, "error": form.errors, "message" : "Invalid Request"}
        except:
            return {"status": 501, "error": "Exception while uploading file"}
    return {"status" : 501,  "error":"File Upload Failed. Try Again!"}

@json_response
def submit_form(request):
    if request.method == 'POST':
        form= NameForm(request.POST)
        if form.is_valid():
            return {"success":"true"}
    return {"status" : 501,  "fail":"true"}

@json_response
def getJSON(request):
    json_data=open('uploadedFiles/myFile.json')
    data = json.load(json_data)
    json_data.close()
    return data


def handle_uploaded_file(f):
    with open('uploadedFiles/'+f.name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)