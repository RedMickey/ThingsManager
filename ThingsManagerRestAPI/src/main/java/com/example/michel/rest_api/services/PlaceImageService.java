package com.example.michel.rest_api.services;

import com.example.michel.rest_api.FileStorageProperties;
import com.example.michel.rest_api.exception.image_files.ImageReadException;
import com.example.michel.rest_api.exception.image_files.ImageWriteException;
import com.example.michel.rest_api.models.PlaceImage;
import com.example.michel.rest_api.repositories.PlaceImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

@Service
public class PlaceImageService {
    private final Path placeImagesLocation;
    private final PlaceImageRepository placeImageRepository;
    private final String baseReference;

    @Value("${imageServer.URL}")
    private String imageServerURL;

    @Autowired
    public PlaceImageService(
            PlaceImageRepository placeImageRepository,
            FileStorageProperties fileStorageProperties
    ) {
        this.baseReference = "/images/placeImage/";
        this.placeImageRepository = placeImageRepository;
        this.placeImagesLocation = Paths.get(fileStorageProperties.getPlaceImagesPath())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.placeImagesLocation);
        } catch (Exception ex) {
            System.out.println("Could not create the directory where the uploaded files will be stored.");
        }
    }

    public List<PlaceImage> getAllByIdPlace(Integer idPlace) {
        return placeImageRepository.findAllByIdPlace(idPlace);
    }

    public void deleteImagesByIdPlace(Integer idPlace) {
        List<PlaceImage> placeImages = placeImageRepository.findAllByIdPlace(idPlace);
        placeImages.stream().map(placeImage -> {
           String[] pathParts = placeImage.getImageLocation().split("/");
           return pathParts[pathParts.length - 1];
        });


        placeImageRepository.deleteAllByIdPlace(idPlace);
    }

    public void deleteImage() {

    }

    public byte[] getImageAsByteArr(String imageName) throws ImageReadException {
        try {
            return Files.readAllBytes(this.placeImagesLocation.resolve(imageName));
        } catch (Exception ex) {
            throw new ImageReadException(ex);
        }
    }

    public BufferedImage getBufferedImage(String imageName) throws ImageReadException {
        try {
            BufferedImage image = ImageIO.read(new File(this.placeImagesLocation.resolve(imageName).toString()));
            return image;
        } catch (Exception err) {
            throw new ImageReadException(err);
        }
    }

    public Boolean[] saveImages(String[] base64Images, int placeId) {
        return Stream.of(base64Images)
                .map(base64Image -> this.saveImage(base64Image, placeId))
                .toArray(Boolean[]::new);
    }

    public boolean saveImage(String base64Image, int placeId) {
        try {
            // Пока не реф, а обсолютный
            String imgRefPath = writeImageFile(base64Image);
            PlaceImage placeImage = new PlaceImage(0, imgRefPath, null, placeId);
            this.placeImageRepository.save(placeImage);
        } catch (Exception err) {
            return false;
        }

        return true;
    }

    private String writeImageFile(String base64Image) throws ImageWriteException {
        try {
            String[] imageData = base64Image.split(",");
            String imageBase64String = imageData[1];

            Pattern p = Pattern.compile("image.?\\/(\\w+);");
            Matcher matcher = p.matcher(imageData[0]);

            String imageExtension = "";
            if (matcher.find()) {
                imageExtension = matcher.group(1);
            } else {
                throw new Exception("Could not find image extension");
            }

            ByteArrayInputStream bis = new ByteArrayInputStream(Base64.getDecoder().decode(imageBase64String));
            BufferedImage image = ImageIO.read(bis);
            bis.close();

            String imageName = UUID.randomUUID().toString() + "." + imageExtension;
            String fullImagePath = this.placeImagesLocation.resolve(imageName).toString();
            File outputFile = new File(fullImagePath);
            ImageIO.write(image, imageExtension, outputFile);

            return imageServerURL + baseReference + imageName;
        } catch (Exception err) {
            throw new ImageWriteException(err);
        }
    }
}
