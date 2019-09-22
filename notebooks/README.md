# HealthHack 2019
The purpose of the code in this folde is to prepare the annotated data from CVAT (as PASCAL VOC) and train a model using the Matterport Mask R-CNN framework.

## Preprocessing
Starting from a series of videos of the kitchen tray return, the videos were manually restricted to regions where trays were actively being moved onto the conveyor. This was a very coarse process, since precision wasn't needed. The videos were then composited into a monolithic video and evenly subsampled to produce 500 frames.

The video was first preprocessed by trying to compensate for the intrinsic distortion induced by the camera using OpenCV. The radial distortion at the periphery of the image was severe, and unfortunately some of the clearest views of the trays were in this region (since lids occluding the state of main meals was often left on until the tray had reached the right hand side of the field of view). We obtained estimates for the intrinsic parameters of the camera (GoPro Hero 3) online. The correction was not perfect since we did not know the extrinsic parameters of the camera setup. This process is documented in `HH19_preprocess_undistort.ipynb`

## Annotation and Dataset Construction
An instance of the Computer Vision Annotation Tool (CVAT) was deployed onto a remote server, and the annotation job was prepared. Using OpenVINO extensions, CVAT allows automatic segmentation via the Deep Extreme Cut algorithm. Unfortunately, due to the fact that so much of the food was amorphous and that the video quality was low, the automatic segmentation wasn't as effective as it could have been. A combination of team members and volunteers annotated all 500 frames. 

As is the case with all freshly labelled data, there was some cleaning to do. Some of this was manual. The annotations of any given had substantial overlap, since marking up the boundary of a plate covered in food would have been unnecessarily time consuming. Instead we just used the fact that food occludes plates and plates occlude trays to infer the z-ordering of masks. Then we use the z-ordering to construct correctly occluded masks. These masks are used to construct a 3D tensor of binary masks. Finally, the dataset was split into train and validation datasets, at a ratio of 0.85:0.15, respectively. Ideally, we would have had a test set as well, however, given that time did not allow for moore extensive model selection, having a test set would have been superfluous (and left us with even less data for training). This process is documented at the start of `HH19_dataset_build_model_train.ipynb`. 

## Model Training
With the data prepared, we are ready to train. We used the Matterport Mask-RCNN framework, which uses Resnet-101 and Feature Pyramic Networks (FPNs) for effective multiscale feature extraction. Due to the small size of our dataset, it was convenient to start from weights pretrained on the COCO dataset (i.e. transfer learning). This is also convenient for our constrained resources and time. By retraining the head only for 30 epochs and then fine-tuning the whole network for 15 epochs, we were able to achieve reasonable performance within an hour. This process is documented in `HH19_dataset_build_model_train.ipynb`.

## Inference
The model was run on the validation dataset and the outputs serialised into COCO JSON format, since some parts of the frontend were intended to use that particular format. The model was also run on a contiguous segment of the original footage, annotated, and converted back into a video. This process is documented in `HH_preprocess_undistort.ipynb`.

## Discussion
This model is not even close to optimal. Loss curves suggest that the model had not fully converged before training was stopped due to time constraints. Having access to more computing power would allow the use of more powerful feature extractors, such as NASnet or Inception-Resnet-v2. We could also have made use of differential learning to speed up the fine-tuning process. 
