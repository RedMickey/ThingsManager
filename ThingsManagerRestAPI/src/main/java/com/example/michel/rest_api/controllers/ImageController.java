package com.example.michel.rest_api.controllers;

import com.example.michel.rest_api.services.PlaceImageService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/images")
public class ImageController {

    @Autowired
    private PlaceImageService placeImageService;

    @GetMapping(value = "/placeImage/{imgName}", produces = {MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    @ResponseBody
    public ResponseEntity<byte[]> getImage(@PathVariable String imgName) throws Exception {
        String imageExt = FilenameUtils.getExtension(imgName);
        MediaType mediaType = null;

        switch (imageExt) {
            case "jpeg":
                mediaType = MediaType.IMAGE_JPEG;
                break;
            case "gif":
                mediaType = MediaType.IMAGE_GIF;
                break;
            case "png":
                mediaType = MediaType.IMAGE_PNG;
                break;
                default:
                    throw new Exception("Unsupported image extension");
        }

        byte[] bufferedImage = this.placeImageService.getImageAsByteArr(imgName);

        return ResponseEntity
                .ok()
                .contentType(mediaType)
                .body(bufferedImage);
    }
}
