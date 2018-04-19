#Rscript expression.R  <path to matrix file 1> <path to matrix file 2> <input genename> <output prefix>
library("data.table")
Args=commandArgs(trailingOnly = TRUE)

#reading file
library(limma)
library(pheatmap)
zdf1<-fread(Args[1],header=TRUE)
zdf2<-fread(Args[2],header=TRUE)
zdf = rbind(zdf1,zdf2,fill=TRUE)
zdf = setDF(zdf)
rownames(zdf) = zdf[,1]
zdf = zdf[,-1]

rpkm_data_1 = zdf[Args[3],]
rpkm_data_2 = transpose(rpkm_data_1)
rownames(rpkm_data_2) = colnames(rpkm_data_1)
colnames(rpkm_data_2) = rownames(rpkm_data_1)

fwrite(rpkm_data_2,file = paste("app/public/corr/",Args[5],".1vn.table.csv",sep=""),append=FALSE,row.names = TRUE,sep = ",", sep2 = c("","|",""),col.names = TRUE,quote = FALSE)
