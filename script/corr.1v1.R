#Rscript expression.R  <path to matrix file 1> <path to matrix file 2> <input genename 1> <input genename 2> <output prefix> <sample ids split by ','>
library("data.table")
Args=commandArgs(trailingOnly = TRUE)
Args[3]=toupper(Args[3])
Args[4]=toupper(Args[4])
options(stringsAsFactors=FALSE)
print(Args)
#reading file
# library(limma)
# library(pheatmap)
zdf1<-system(paste(sep="","grep ",Args[3]," ",Args[1]), intern = TRUE)
zdf1=strsplit(zdf1,split="\t")
zdf1=unlist(zdf1)
zdf2<-system(paste(sep="","grep ",Args[4]," ",Args[2]), intern = TRUE, ignore.stderr = TRUE)
zdf2=strsplit(zdf2,split="\t")
zdf2=unlist(zdf2)
names=system(paste(sep="","head -n 1 ",Args[2]), intern = TRUE, ignore.stderr = TRUE)
names=strsplit(names,split="\t")
names=unlist(names)
zdf = rbind(zdf1,zdf2,fill=TRUE)
zdf = data.frame(zdf)
rownames(zdf) = zdf[,1]
colnames(zdf)=names
zdf = zdf[,-1]
zdf=as.matrix(zdf)
zdf[which(is.na(zdf))]=0
zdf=data.frame(zdf)
i=1
n=ncol(zdf)
while(i<=n){
	zdf[,i]=as.numeric(zdf[,i])
	i=i+1
}
zdf=as.matrix(zdf)
zdf[which(is.na(zdf))]=0
zdf=data.frame(zdf)
#print(str(zdf))
dataset=Args[7]
if(!is.na(dataset)){
  sample_bank=fread(Args[6],sep=",",header=TRUE)
  dataset=strsplit(dataset,split=",")
  dataset=data.frame(Dataset.ID=unlist(dataset))
  sample=merge(dataset,sample_bank,by="Dataset.ID",all.x=T)
  temp=sample$Sample.ID
  zdf=zdf[,intersect(temp,colnames(zdf))]
  rownames(sample)=sample$Sample.ID
  colnames(zdf)=paste(sep=".",sample[colnames(zdf),'Dataset.ID'],
                      sample[colnames(zdf),'Sample.ID'])
}

rpkm_data_1 = zdf[c(Args[3],Args[4]),]
rpkm_data_2 = transpose(rpkm_data_1)
rownames(rpkm_data_2) = colnames(rpkm_data_1)
colnames(rpkm_data_2) = rownames(rpkm_data_1)

fwrite(rpkm_data_2,file = paste("app/public/corr/",Args[5],".1v1.table.csv",sep=""),append=FALSE,row.names = TRUE,sep = ",", sep2 = c("","|",""),col.names = TRUE,quote = FALSE)
