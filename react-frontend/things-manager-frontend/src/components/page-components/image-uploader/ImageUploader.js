import React, { Component } from 'react';
import { 
    Form,
    Image 
} from 'react-bootstrap';
import './ImageUploader.css';

export class ImageUploader extends Component {

    suitableImageExtensions = [
        "image/jpeg",
        "image/png",
        "image/gif"
    ]

    constructor (props) {
        super(props);
        this.onImagesUploaded = this.onImagesUploaded.bind(this);

        this.formElem = null;

        this.state = {
            imageURLs: [],  
        };
    }

    reset() {
        this.setState({imageURLs: []});
        this.formElem.value = "";
    }

    getImageURL(imageFile) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = function(e) {
                resolve(e.target.result);
            };
            reader.onerror = (err) => {
                reject();
            };
            reader.readAsDataURL(imageFile); // convert to base64 string
        });
    }

    onImagesUploaded(event) {
        const images = Array.from(event.currentTarget.files).filter(file => 
            this.suitableImageExtensions.includes(file.type));
        
        let imgPromises = images.map(image => this.getImageURL(image));

        this.props.setFieldValue(this.props.propertyName, imgPromises);
        Promise.allSettled(imgPromises)
            .then(results => {
                return results.map(imgRes => {
                    if (imgRes.status === "fulfilled") {
                        return imgRes.value;
                    } else {
                        return "";
                    }
                });
            })
            .then(images64Base => {
                this.setState({imageURLs: images64Base});
            });
    }

    render() {
        return (
            <div>
                <Form.File  
                    name="images[]"
                    onChange={this.onImagesUploaded}
                    multiple
                    accept={this.suitableImageExtensions.join(",")}
                    ref={el => this.formElem = el}
                />
                <div class="d-inline">
                    {
                        this.state.imageURLs.map(image => 
                            <Image src={image} className="preview-img mt-2 mr-2" rounded />
                        )
                    }
                </div>
            </div>
        )
    }
}

export default ImageUploader
